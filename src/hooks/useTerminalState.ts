/**
 * Terminal State Management Hook
 * @module hooks/useTerminalState
 */

import { useState, useCallback, useMemo } from 'react';
import type { Message } from '../core/types';

interface UseTerminalStateReturn {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  conversationHistory: Message[];
}

export const useTerminalState = (): UseTerminalStateReturn => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const conversationHistory = useMemo(() => {
    return messages.filter(
      (msg) => msg.role === 'user' || msg.role === 'assistant'
    );
  }, [messages]);

  return {
    messages,
    addMessage,
    clearMessages,
    conversationHistory,
  };
};
