/**
 * Response Streaming and Server-Sent Events
 * @module core/inference/response-stream
 */

export class ResponseStream {
  public readable: ReadableStream;
  private controller: ReadableStreamDefaultController | null = null;

  constructor(response: any) {
    this.readable = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        this.processResponse(response, controller);
      },
    });
  }

  private async processResponse(
    response: any,
    controller: ReadableStreamDefaultController
  ): Promise<void> {
    try {
      // Parse SSE stream from API
      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const chunk = parsed.choices[0]?.delta?.content;
              if (chunk) {
                controller.enqueue(new TextEncoder().encode(chunk));
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      controller.close();
    } catch (error) {
      controller.error(error);
    }
  }

  async close(): Promise<void> {
    this.controller?.close();
  }
}
