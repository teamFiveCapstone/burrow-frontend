import { useState } from "react";
import "./App.css";
import { Upload } from "./components/Upload";
import { SummaryDashboard } from "./components/SummaryDashboard";
import { DocumentsDashboard } from "./components/DocumentsDashboard";

function App() {
  const onUpload = () => {};

  const files = [
  {
    fileName: "lion.pdf",
    status: "pending",
    createdAt: "2025-11-21T02:24:37.139Z"
  },
  {
    fileName: "tiger.pdf",
    status: "completed",
    createdAt: "2025-11-20T11:10:12.000Z"
  },
  {
    fileName: "zebra.pdf",
    status: "pending",
    createdAt: "2025-11-18T15:22:05.900Z"
  },
  {
    fileName: "elephant.pdf",
    status: "failed",
    createdAt: "2025-11-17T22:33:44.721Z"
  }]

  return (
    <div className="main-container">
      <div className="left-section">
        <Upload onUpload={onUpload} />
      </div>
      <div className="right-section">
        <SummaryDashboard />
        <DocumentsDashboard documents={files}/>
      </div>
    </div>
  );
}

export default App;
