import React from "react";

export interface DocumentData {
  documentId: string;
  status: "pending" | "running" | "finished" | "failed" | "deleting" | "deleted" | "delete_failed";
  fileName: string;
  size: number;
  createdAt: string;
}

interface DocumentProps {
  document: DocumentData;
  onDelete?: (documentId: string, fileName: string) => void;
}

const formatSize = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

export const Document: React.FC<DocumentProps> = ({ document, onDelete }) => {
  const canDelete = document.status === 'finished' || document.status === 'failed';
  return (
    <tr className="document-row">
      <td className="document-filename">{document.fileName}</td>
      <td className="document-status">
        <span className={`status-badge status-${document.status}`}>
          {document.status}
        </span>
      </td>
      <td className="document-size">{formatSize(document.size)}</td>
      <td className="document-date">{formatDate(document.createdAt)}</td>
      <td className="document-actions">
        {
          canDelete && onDelete && (
            <button className="delete-button"
                    onClick={() => onDelete(document.documentId, document.fileName)}>
              Delete
            </button>
          )
        }
      </td>
    </tr>
  );
};
