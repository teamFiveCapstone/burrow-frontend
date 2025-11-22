import React from 'react';

export interface DocumentData {
  fileName: string;
  status: string;
  createdAt: string;
}

interface DocumentProps {
  document: DocumentData;
}

export const Document: React.FC<DocumentProps> = ({ document }) => {
  return (
    <div>
      <div>{document.fileName}</div>
      <div>{document.status}</div>
      <div>{document.createdAt}</div>
    </div>
  );
};