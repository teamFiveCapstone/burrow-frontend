import { useState, useEffect } from "react";
import "./App.css";
import { Upload } from "./components/Upload";
import { SummaryDashboard } from "./components/SummaryDashboard";
import { DocumentsDashboard } from "./components/DocumentsDashboard";
import { Login } from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

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

  const handleLogout = () => {
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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

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
