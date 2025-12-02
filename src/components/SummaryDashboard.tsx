import React from 'react';

interface SummaryDashboardProps {
}

// TODO: figure out what type of summary we want to provide
export const SummaryDashboard:
  React.FC<SummaryDashboardProps> = () => {
    return (
      <div className="summary-dashboard">
        <h2>Pipeline Architecture</h2>
        <div className="pipeline-cards">
          <div className="pipeline-card">
            <div className="card-icon">📄</div>
            <div className="card-label">Parser</div>
            <div className="card-value">Docling</div>
          </div>

          <div className="pipeline-card">
            <div className="card-icon">✂️</div>
            <div className="card-label">Chunking</div>
            <div className="card-value">HybridChunker</div>
            <div className="card-detail">max 4096
  tokens</div>
          </div>

          <div className="pipeline-card">
            <div className="card-icon">🧠</div>
            <div className="card-label">Embedding</div>
            <div className="card-value">Amazon Titan</div>
            <div className="card-detail">Text v2</div>
          </div>

          <div className="pipeline-card">
            <div className="card-icon">💾</div>
            <div className="card-label">Storage</div>
            <div className="card-value">AWS S3</div>
          </div>
        </div>
      </div>
    );
  };
  