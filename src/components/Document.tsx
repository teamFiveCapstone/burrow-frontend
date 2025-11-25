import React from "react";

export interface DocumentData {
  documentId: string;
  status: "pending" | "running" | "finished" | "failed";
  fileName: string;
  size: number;
  createdAt: string;
}

interface DocumentProps {
  document: DocumentData;
}

const formatSize = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const Document: React.FC<DocumentProps> = ({ document }) => {
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
    </tr>
  );
};
