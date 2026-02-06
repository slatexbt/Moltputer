/**
 * Terminal Core Component
 * @module components/Terminal/TerminalCore
 * @author Moltputer Dev Team
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTerminalState } from '../../hooks/useTerminalState';
import { useInference } from '../../hooks/useInference';
import { MessageRenderer } from './MessageRenderer';
import { InputHandler } from './InputHandler';
import { TerminalHeader } from './TerminalHeader';
import type { Message } from '../../core/types';

interface TerminalCoreProps {
  initialMessage?: string;
  autoFocus?: boolean;
  enableTTS?: boolean;
  className?: string;
}

export const TerminalCore: React.FC<TerminalCoreProps> = ({
  initialMessage = 'MOLTPUTER PROTOCOL INITIALIZED',
  autoFocus = true,
  enableTTS = true,
  className = '',
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    messages,
    addMessage,
    clearMessages,
    conversationHistory,
  } = useTerminalState();

  const {
    sendMessage,
    isLoading,
    error,
  } = useInference();

  useEffect(() => {
    if (initialMessage) {
      addMessage({
        role: 'assistant',
        content: initialMessage,
        metadata: { timestamp: Date.now() },
      });
    }
  }, []);

  const handleSubmit = useCallback(async (input: string) => {
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);

    // Add user message to display
    const userMessage: Message = {
      role: 'user',
      content: input,
      metadata: { timestamp: Date.now() },
    };
    addMessage(userMessage);

    try {
      // Send to inference engine
      const response = await sendMessage(input, conversationHistory);

      // Add assistant response to display
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content || '',
        metadata: response.metadata,
      };
      addMessage(assistantMessage);

      // Trigger TTS if enabled
      if (enableTTS && response.content) {
        await speakText(response.content);
      }
    } catch (err) {
      console.error('Terminal error:', err);
      addMessage({
        role: 'assistant',
        content: 'Connection interrupted. System reset required. Retry query.',
        metadata: { timestamp: Date.now() },
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, conversationHistory, enableTTS]);

  const speakText = async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.playbackRate = 1.3;
        await audio.play();
      }
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom on new messages
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`terminal-core ${className}`}>
      <TerminalHeader onClear={clearMessages} />

      <div ref={terminalRef} className="terminal-display">
        {messages.map((message, index) => (
          <MessageRenderer
            key={`${message.metadata?.timestamp}-${index}`}
            message={message}
          />
        ))}
        {isProcessing && (
          <div className="processing-indicator">
            <span className="cursor-blink">▊</span>
          </div>
        )}
      </div>

      <InputHandler
        onSubmit={handleSubmit}
        disabled={isProcessing}
        autoFocus={autoFocus}
        placeholder="> QUERY SYSTEM..."
      />

      {error && (
        <div className="terminal-error">
          ERROR: {error.message}
        </div>
      )}
    </div>
  );
};
