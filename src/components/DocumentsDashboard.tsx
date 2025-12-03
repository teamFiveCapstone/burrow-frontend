import React from "react";
import { Document, type DocumentData } from "./Document";
import { StatusButtons } from "./StatusButtons";
import { Pagination } from "./Pagination";

interface DocumentsDashboardProps {
  documents: DocumentData[];
  onStatusChange?: (status: string | undefined) => void;
  onNextPage?: () => void;
  onDelete?: (documentId: string, fileName: string) => void;
  hasNextPage?: boolean;
}

export const DocumentsDashboard: React.FC<DocumentsDashboardProps> = ({
  documents,
  onStatusChange,
  onNextPage,
  hasNextPage = false,
  onDelete,
}) => {
  return (
    <div className="documents-dashboard">
      <div className="documents-dashboard-header">
        <h1>Document Status</h1>
        <StatusButtons onStatusChange={onStatusChange} />
      </div>
      <div className="documents-table-container">
        <table className="documents-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Status</th>
              <th>Size</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <Document
                key={doc.documentId || `${doc.fileName}-${index}`}
                document={doc}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        onNext={onNextPage}
        hasNext={hasNextPage}
        hasPrevious={false}
      />
    </div>
  );
};
