/**
 * Terminal Input Handler Component
 * @module components/Terminal/InputHandler
 */

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface InputHandlerProps {
  onSubmit: (input: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export const InputHandler: React.FC<InputHandlerProps> = ({
  onSubmit,
  disabled = false,
  autoFocus = true,
  placeholder = '> QUERY SYSTEM...',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSubmit(input);
        setInput('');
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="input-box"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      rows={1}
    />
  );
};
