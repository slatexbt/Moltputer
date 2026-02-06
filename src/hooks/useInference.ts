/**
 * Inference Hook - API Integration
 * @module hooks/useInference
 */

import { useState, useCallback } from 'react';
import type { Message, InferenceResponse } from '../core/types';

interface UseInferenceReturn {
  sendMessage: (input: string, history: Message[]) => Promise<InferenceResponse>;
  isLoading: boolean;
  error: Error | null;
}

export const useInference = (): UseInferenceReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (
    input: string,
    history: Message[]
  ): Promise<InferenceResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...history,
            { role: 'user', content: input },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      let content = '';
      if (data.content && Array.isArray(data.content)) {
        const textBlock = data.content.find((block: any) => block.type === 'text');
        if (textBlock) {
          content = textBlock.text;
        }
      }

      return {
        id: crypto.randomUUID(),
        content,
        metadata: {
          model: 'anthropic/claude-3.7-sonnet',
          timestamp: Date.now(),
        },
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
  };
};
