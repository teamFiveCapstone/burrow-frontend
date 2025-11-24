interface LogoutProps {
  onLogOut: () => void;
  user: string | null;
}

export const Profile = ({ onLogOut, user }: LogoutProps) => {
  return (
    <div className="profile">
      <span className="user-info">Logged in as: {user}</span>
      <button className="logout-button" onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
};
