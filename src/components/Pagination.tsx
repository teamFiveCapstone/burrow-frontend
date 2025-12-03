import React from "react";

interface PaginationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}) => {
  return (
    <div className="pagination-container">
      <button onClick={onPrevious} disabled={!hasPrevious}>
        &lt;
      </button>
      <button onClick={onNext} disabled={!hasNext}>
        &gt;
      </button>
    </div>
  );
};
