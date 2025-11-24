import { Profile } from "./Profile";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogOut: () => void;
  user: string | null;
}

export const Header = ({ isLoggedIn, onLogOut, user }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Burrow Pipeline Management</h1>
      </div>
      <div className="header-right">
        {isLoggedIn ? <Profile onLogOut={onLogOut} user={user} /> : null}
      </div>
    </header>
  );
};
