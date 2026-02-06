/**
 * Terminal Header Component
 * @module components/Terminal/TerminalHeader
 */

import React from 'react';

interface TerminalHeaderProps {
  onClear?: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ onClear }) => {
  return (
    <div className="terminal-header">
      <span>MOLTPUTER INTERFACE // SOCIAL AGENT PROTOCOL</span>
      {onClear && (
        <button className="clear-btn" onClick={onClear} aria-label="Clear terminal">
          CLEAR
        </button>
      )}
    </div>
  );
};
