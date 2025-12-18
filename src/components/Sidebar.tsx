import { useState } from "react";
import logo from "../assets/images/Transparent Logo.png";
import { Profile } from "./Profile";

interface SidebarProps {
  activeView: "dashboard" | "upload" | "query-api" | "pipeline-api";
  onViewChange: (
    view: "dashboard" | "upload" | "query-api" | "pipeline-api"
  ) => void;
  onLogOut: () => void;
  user: string | null;
}

export const Sidebar = ({
  activeView,
  onViewChange,
  onLogOut,
  user,
}: SidebarProps) => {
  const [apiDocsExpanded, setApiDocsExpanded] = useState(
    activeView === "query-api" || activeView === "pipeline-api"
  );

  const isApiDocsActive =
    activeView === "query-api" || activeView === "pipeline-api";

  const toggleApiDocs = () => {
    setApiDocsExpanded(!apiDocsExpanded);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Burrow Logo" className="sidebar-logo-img" />
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-nav-button ${
            activeView === "dashboard" ? "active" : ""
          }`}
          onClick={() => onViewChange("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`sidebar-nav-button ${
            activeView === "upload" ? "active" : ""
          }`}
          onClick={() => onViewChange("upload")}
        >
          Upload Files
        </button>

        <div className="sidebar-section">
          <button
            className={`sidebar-nav-button sidebar-section-button ${
              isApiDocsActive ? "active" : ""
            }`}
            onClick={toggleApiDocs}
          >
            API Docs
            <span
              className={`sidebar-expand-icon ${
                apiDocsExpanded ? "expanded" : ""
              }`}
            >
              ▶
            </span>
          </button>

          {apiDocsExpanded && (
            <div className="sidebar-subsection">
              <button
                className={`sidebar-nav-button sidebar-subsection-button ${
                  activeView === "query-api" ? "active" : ""
                }`}
                onClick={() => onViewChange("query-api")}
              >
                RAG API
              </button>
              <button
                className={`sidebar-nav-button sidebar-subsection-button ${
                  activeView === "pipeline-api" ? "active" : ""
                }`}
                onClick={() => onViewChange("pipeline-api")}
              >
                Pipeline API
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <Profile onLogOut={onLogOut} user={user} />
      </div>
    </div>
  );
};
