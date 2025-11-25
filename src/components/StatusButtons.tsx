import React, { useState } from "react";

interface StatusButtonsProps {
  onStatusChange?: (status: string | undefined) => void;
}

export const StatusButtons: React.FC<StatusButtonsProps> = ({
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );

  const handleStatusClick = (status: string | undefined) => {
    setSelectedStatus(status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  return (
    <div className="status-buttons">
      <button
        className={selectedStatus === undefined ? "active" : ""}
        onClick={() => handleStatusClick(undefined)}
      >
        all
      </button>
      <button
        className={selectedStatus === "pending" ? "active" : ""}
        onClick={() => handleStatusClick("pending")}
      >
        pending
      </button>
      <button
        className={selectedStatus === "running" ? "active" : ""}
        onClick={() => handleStatusClick("running")}
      >
        running
      </button>
      <button
        className={selectedStatus === "failed" ? "active" : ""}
        onClick={() => handleStatusClick("failed")}
      >
        failed
      </button>
      <button
        className={selectedStatus === "finished" ? "active" : ""}
        onClick={() => handleStatusClick("finished")}
      >
        finished
      </button>
    </div>
  );
};

