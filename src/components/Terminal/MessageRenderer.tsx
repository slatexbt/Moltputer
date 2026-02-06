/**
 * Message Renderer Component
 * @module components/Terminal/MessageRenderer
 */

import React from 'react';
import type { Message } from '../../core/types';

interface MessageRendererProps {
  message: Message;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
  const className = message.role === 'user' ? 'user-message' : 'assistant-message';

  return (
    <div className={`message ${className}`}>
      {message.role === 'user' && '> '}
      {message.content}
    </div>
  );
};
