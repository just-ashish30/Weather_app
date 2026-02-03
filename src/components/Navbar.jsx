import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi"; // vector logout icon

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      {/* LEFT */}
      <div style={leftStyle}>
        <Link to="/" style={logoStyle}>🌤️ WeatherApp</Link>
      </div>

      {/* CENTER */}
      <div style={centerStyle}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/cities">Cities</Link>
        <Link style={linkStyle} to="/settings">Settings</Link>
      </div>

      {/* RIGHT */}
      <div style={rightStyle}>
        <img
          src={user?.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=40"}
          alt="user"
          style={avatarStyle}
        />

        {user ? (
          <button onClick={handleLogout} style={logoutStyle}>
            <FiLogOut style={{ marginRight: "5px", fontSize: "20px" }} />
            Logout
          </button>
        ) : (
          <Link style={linkStyle} to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

/* STYLES */
const navStyle = {
  height: "70px",
  display: "flex",
  alignItems: "center",
  padding: "0 30px",
  backgroundColor: "#003366",
};

const leftStyle = { flex: 1 };
const centerStyle = { flex: 2, display: "flex", justifyContent: "center", gap: "30px" };
const rightStyle = { flex: 1, display: "flex", justifyContent: "flex-end", gap: "15px", alignItems: "center" };

const logoStyle = { color: "#fff", fontSize: "1.2rem", fontWeight: "700", textDecoration: "none" };
const linkStyle = { color: "#fff", textDecoration: "none" };

const avatarStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "2px solid white",
};

const logoutStyle = {
  display: "flex",
  alignItems: "center",
  background: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;
