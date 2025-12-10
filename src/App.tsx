import { useState, useEffect } from "react";
import "./App.css";
import { Upload } from "./components/Upload";
import { SummaryDashboard } from "./components/SummaryDashboard";
import { DocumentsDashboard } from "./components/DocumentsDashboard";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import PipelineApiDocs from "./components/PipelineApiDocs";
import type { DocumentData } from "./components/Document";
import {
  fetchDocuments,
  uploadDocument,
  deleteDocument,
  type UploadResult,
  type LastEvaluatedKey,
} from "./services/authService";
import { ApiDocs } from "./components/ApiDocs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<
    "dashboard" | "upload" | "query-api" | "pipeline-api"
  >("dashboard");
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<LastEvaluatedKey | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string | undefined>(
    undefined
  );

  const handleLogOut = () => {
    localStorage.removeItem("burrow_token");
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleLogin = (newToken: string) => {
    localStorage.setItem("burrow_token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setUser("admin");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("burrow_token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      setUser("admin");
    }
  }, []);

  useEffect(() => {
    const loadDocuments = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await fetchDocuments(token);
        console.log(response);
        setDocuments(response.items);
        setLastEvaluatedKey(response.lastEvaluatedKey || null);
        setHasNextPage(!!response.lastEvaluatedKey);
      } catch (error) {
        console.error("Failed to load documents:", error);
        // If token is expired, log out user
        if (error instanceof Error && error.message.includes("Token expired")) {
          handleLogOut();
        }
      }
    };

    loadDocuments();
  }, [token]);

  const handleStatusChange = async (status: string | undefined) => {
    if (!token) {
      return;
    }

    // Reset pagination when status filter changes
    setLastEvaluatedKey(null);
    setHasNextPage(false);
    setCurrentStatus(status);

    try {
      const response = await fetchDocuments(token, status);
      setDocuments(response.items);
      setLastEvaluatedKey(response.lastEvaluatedKey || null);
      setHasNextPage(!!response.lastEvaluatedKey);
    } catch (error) {
      console.error("Failed to load documents:", error);
      // If token is expired, log out user
      if (error instanceof Error && error.message.includes("Token expired")) {
        handleLogOut();
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const es = new EventSource(`/api/events?token=${token}`);

    es.onmessage = (event) => {
      try {
        const updatedDoc = JSON.parse(event.data) as DocumentData;

        setDocuments((prev) => {
          const idx = prev.findIndex(
            (d) => d.documentId === updatedDoc.documentId
          );

          if (idx === -1) {
            return [updatedDoc, ...prev];
          }

          const next = [...prev];
          next[idx] = { ...next[idx], ...updatedDoc };
          return next;
        });
      } catch (err) {
        console.error("Error parsing SSE event:", err);
      }
    };

    return () => {
      es.close();
    };
  }, [isLoggedIn]);

  const handleNextPage = async () => {
    if (!token || !lastEvaluatedKey) {
      return;
    }

    try {
      const response = await fetchDocuments(
        token,
        currentStatus,
        lastEvaluatedKey
      );
      // Append new items to existing documents
      setDocuments([...response.items]);
      setLastEvaluatedKey(response.lastEvaluatedKey || null);
      setHasNextPage(!!response.lastEvaluatedKey);
    } catch (error) {
      console.error("Failed to load next page:", error);
      // If token is expired, log out user
      if (error instanceof Error && error.message.includes("Token expired")) {
        handleLogOut();
      }
    }
  };

  const handleUpload = async (selectedFiles: File[]) => {
    if (!token) {
      return;
    }

    const results: UploadResult[] = [];
    const uploadedDocuments: DocumentData[] = [];

    for (const file of selectedFiles) {
      console.log(`Uploading ${file.name}...`);
      const result = await uploadDocument(token, file);
      results.push(result);

      if (result.success && result.data) {
        uploadedDocuments.push(result.data);
        console.log(`Successfully uploaded ${file.name}`);
      } else {
        console.error(`Failed to upload ${file.name}:`, result.error);
      }
    }

    // Update results to show in the Upload component
    setUploadResults(results);

    // Add successfully uploaded documents to the documents list
    if (uploadedDocuments.length > 0) {
      setDocuments((prev) => [...uploadedDocuments, ...prev]);
    }

    // No longer redirect to dashboard - stay on upload page
  };

  const handleDelete = async (documentId: string, fileName: string) => {
    if (!token) {
      return;
    }

    const confirmed = window.confirm(`Delete "${fileName}"?`);

    if (!confirmed) {
      return;
    }

    setDocuments((prev) =>
      prev.map((document) =>
        document.documentId === documentId
          ? { ...document, status: "deleting" as const }
          : document
      )
    );

    try {
      await deleteDocument(token, documentId);
    } catch (error) {
      console.error("Failed to delete document:", error);
      setDocuments((prev) =>
        prev.map((document) =>
          document.documentId === documentId
            ? { ...document, status: "delete_failed" as const }
            : document
        )
      );

      if (error instanceof Error && error.message.includes("Token expired")) {
        handleLogOut();
      }
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    if (activeView === "upload") {
      return (
        <div className="main-content-upload">
          <Upload onUpload={handleUpload} uploadResults={uploadResults} />
        </div>
      );
    }

    if (activeView === "query-api") {
      return (
        <div className="main-content-docs">
          <ApiDocs />
        </div>
      );
    }

    if (activeView === "pipeline-api") {
      return (
        <div className="main-content-docs">
          <PipelineApiDocs />
        </div>
      );
    }

    return (
      <div className="main-content-dashboard">
        <SummaryDashboard />
        <DocumentsDashboard
          documents={documents}
          onStatusChange={handleStatusChange}
          onNextPage={handleNextPage}
          hasNextPage={hasNextPage}
          onDelete={handleDelete}
        />
      </div>
    );
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onLogOut={handleLogOut}
        user={user}
      />
      <div className="main-area">
        <div className="main-content">{renderMainContent()}</div>
      </div>
    </div>
  );
}

export default App;
