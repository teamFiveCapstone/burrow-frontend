import React from 'react';
import { Document, type DocumentData } from './Document';
import { Pagination } from './Pagination';

interface DocumentsDashboardProps {
  documents: DocumentData[];
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const DocumentsDashboard: React.FC<DocumentsDashboardProps> = ({
  documents,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  return (
    <div className="documents-dashboard">
      <h1>Document status</h1>
      <div className="status-buttons">
        <button>all</button>
        <button>pending</button>
        <button>running</button>
        <button>failed</button>
        <button>finished</button>
      </div>
      <div>
        {documents.map((doc, index) => (
          <Document key={`${doc.fileName}-${index}`} document={doc} />
        ))}
      </div>
      <Pagination
        onNext={onNext}
        onPrevious={onPrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
};