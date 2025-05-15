'use client';
import type React from 'react';

interface InlineCodeProps {
  children: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code
      className="bg-muted text-foreground px-2 py-1 rounded-md text-sm font-mono"
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </code>
  );
};

export default InlineCode;
