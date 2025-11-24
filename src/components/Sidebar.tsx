import logo from "../assets/images/Transparent Logo.png";

interface SidebarProps {
  activeView: 'dashboard' | 'upload';
  onViewChange: (view: 'dashboard' | 'upload') => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Burrow Logo" className="sidebar-logo-img" />
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-nav-button ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`sidebar-nav-button ${activeView === 'upload' ? 'active' : ''}`}
          onClick={() => onViewChange('upload')}
        >
          Upload Files
        </button>
      </nav>
    </div>
  );
};