import React from "react";
import parserImage from "../assets/images/parser.png";
import chunkingImage from "../assets/images/chunking.png";
import embeddingImage from "../assets/images/embedding.png";
import storageImage from "../assets/images/storage.png";

// TODO: figure out what type of summary we want to provide
export const SummaryDashboard: React.FC = () => {
  return (
    <div className="summary-dashboard">
      <h2>Burrow Pipeline Management</h2>
      <div className="pipeline-cards">
        <div className="pipeline-card">
          <div className="card-icon">
            <img src={parserImage} alt="Parser" />
          </div>
          <div className="card-label">Parser</div>
          <div className="card-value">Docling</div>
        </div>

        <div className="pipeline-card">
          <div className="card-icon">
            <img src={chunkingImage} alt="Chunking" />
          </div>
          <div className="card-label">Chunking</div>
          <div className="card-value">HybridChunker</div>
          <div className="card-detail">max 4096 tokens</div>
        </div>

        <div className="pipeline-card">
          <div className="card-icon">
            <img src={embeddingImage} alt="Embedding" />
          </div>
          <div className="card-label">Embedding</div>
          <div className="card-value">Amazon Titan</div>
          <div className="card-detail">Text v2</div>
        </div>

        <div className="pipeline-card">
          <div className="card-icon">
            <img src={storageImage} alt="Storage" />
          </div>
          <div className="card-label">Storage</div>
          <div className="card-value">AWS S3</div>
        </div>
      </div>
    </div>
  );
};
