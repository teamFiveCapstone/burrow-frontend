import React, { useState } from 'react';

interface UploadProps {
  onUpload: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log(file)
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile && onUpload) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            accept="*"
          />
        </div>
        <div>
          <button type="submit" disabled={!selectedFile}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};