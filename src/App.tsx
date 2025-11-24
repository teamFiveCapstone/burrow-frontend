import { useState, useEffect } from "react";
import "./App.css";
import { Upload } from "./components/Upload";
import { SummaryDashboard } from "./components/SummaryDashboard";
import { DocumentsDashboard } from "./components/DocumentsDashboard";
import { Login } from "./components/Login";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'upload'>('dashboard');

  useEffect(() => {
    const storedToken = localStorage.getItem("burrow_token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      setUser("admin");
    }
  }, []);

  const handleLogin = (newToken: string) => {
    localStorage.setItem("burrow_token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setUser("admin");
  };

  const handleLogOut = () => {
    localStorage.removeItem("burrow_token");
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
  };

  const onUpload = () => {};

  const files = [
    {
      fileName: "lion.pdf",
      status: "pending",
      createdAt: "2025-11-21T02:24:37.139Z",
    },
    {
      fileName: "tiger.pdf",
      status: "completed",
      createdAt: "2025-11-20T11:10:12.000Z",
    },
    {
      fileName: "zebra.pdf",
      status: "pending",
      createdAt: "2025-11-18T15:22:05.900Z",
    },
    {
      fileName: "elephant.pdf",
      status: "failed",
      createdAt: "2025-11-17T22:33:44.721Z",
    },
  ];

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    if (activeView === 'upload') {
      return (
        <div className="main-content-upload">
          <Upload onUpload={onUpload} />
        </div>
      );
    }

    return (
      <div className="main-content-dashboard">
        <SummaryDashboard />
        <DocumentsDashboard documents={files} />
      </div>
    );
  };

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="main-area">
        <Header isLoggedIn={isLoggedIn} onLogOut={handleLogOut} user={user} />
        <div className="main-content">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
