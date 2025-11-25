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
      <div className="documents-table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Status</th>
              <th>Size</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <Document key={doc.documentId || `${doc.fileName}-${index}`} document={doc} />
            ))}
          </tbody>
        </table>
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