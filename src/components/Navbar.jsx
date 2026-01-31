import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        padding: "15px 30px",
        backgroundColor: "#003366",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Link style={linkStyle} to="/">
        Home
      </Link>
      <Link style={linkStyle} to="/cities">
        Cities
      </Link>
      <Link style={linkStyle} to="/settings">
        Settings
      </Link>
    </nav>
  );
}

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
  padding: "6px 10px",
  borderRadius: "6px",
  transition: "background 0.2s ease",
};

export default Navbar;
