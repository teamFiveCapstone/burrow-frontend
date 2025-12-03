import React, { useState, useEffect } from "react";
import { type UploadResult } from "../services/authService";

interface UploadProps {
  onUpload: (files: File[]) => void;
  uploadResults?: UploadResult[];
}

export const Upload: React.FC<UploadProps> = ({ onUpload, uploadResults }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (uploadResults && uploadResults.length > 0) {
      // Clear loading state after upload completes
      const timer = setTimeout(() => {
        setIsUploading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [uploadResults]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      console.log(fileArray);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles.length > 0 && onUpload) {
      setIsUploading(true);
      onUpload(selectedFiles);
      setSelectedFiles([]);
      (event.target as any).reset();
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx"
            multiple
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <h4>Selected files ({selectedFiles.length}):</h4>
            <ul className="files-list">
              {selectedFiles.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button type="submit" disabled={selectedFiles.length === 0 || isUploading}>
            {isUploading ? (
              <span className="spinner"></span>
            ) : (
              "Upload"
            )}
          </button>
        </div>

        {uploadResults && uploadResults.length > 0 && (
          <div className="upload-results">
            <h4>Upload Results:</h4>
            <ul className="upload-results-list">
              {uploadResults.map((result, index) => (
                <li key={index} className="upload-result-item">
                  <div className="result-file-info">
                    <span className="result-file-name">{result.fileName}</span>
                    {result.error && (
                      <span className="result-error-message">
                        {result.error}
                      </span>
                    )}
                  </div>
                  <div className="result-status">
                    {result.success ? (
                      <span className="result-success">✓</span>
                    ) : (
                      <span className="result-failure">✗</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
