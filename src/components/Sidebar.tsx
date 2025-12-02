import logo from "../assets/images/Transparent Logo.png";

interface SidebarProps {
  activeView: 'dashboard' | 'upload' | 'sandbox';
  onViewChange: (view: 'dashboard' | 'upload' | 'sandbox') => void;
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
        <button
          className={`sidebar-nav-button ${activeView === 'sandbox' ? 'active' : ''}`}
          onClick={() => onViewChange('sandbox')}
        >
          Query API
        </button>
      </nav>
    </div>
  );
};