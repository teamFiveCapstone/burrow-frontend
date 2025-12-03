import logo from "../assets/images/Transparent Logo.png";
import { Profile } from "./Profile";

interface SidebarProps {
  activeView: "dashboard" | "upload" | "sandbox";
  onViewChange: (view: "dashboard" | "upload" | "sandbox") => void;
  onLogOut: () => void;
  user: string | null;
}

export const Sidebar = ({
  activeView,
  onViewChange,
  onLogOut,
  user,
}: SidebarProps) => {
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
        <button
          className={`sidebar-nav-button ${
            activeView === "sandbox" ? "active" : ""
          }`}
          onClick={() => onViewChange("sandbox")}
        >
          Query API
        </button>
      </nav>

      <div className="sidebar-footer">
        <Profile onLogOut={onLogOut} user={user} />
      </div>
    </div>
  );
};
