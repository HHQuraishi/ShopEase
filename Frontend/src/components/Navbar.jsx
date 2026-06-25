import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const { totalItems } = useCart();

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();

    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#161B22",
    borderBottom: "1px solid #30363D",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const linkStyle = (isActive) => ({
    color: isActive ? "#F0A500" : "#8B949E",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    padding: "4px 8px",
  });

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "#F0A500",
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      ></Link>
      {/* Nav Links */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <NavLink to="/" style={({ isActive }) => linkStyle(isActive)}>
          Home
        </NavLink>
        {/* Cart with badge */}
        <NavLink to="/cart" style={({ isActive }) => linkStyle(isActive)}>
          n Cart
          {totalItems > 0 && (
            <span
              style={{
                background: "#FF6B6B",
                color: "white",
                borderRadius: "50%",
                fontSize: "11px",
                padding: "2px 6px",
                marginLeft: "4px",
              }}
            >
              {totalItems}
            </span>
          )}
        </NavLink>

        {/* Admin link */}

        {isAdmin && (
          <NavLink
            to="/admin/products"
            style={({ isActive }) => linkStyle(isActive)}
          >
            Admin
          </NavLink>
        )}

        {/* Auth buttons */}

        {isLoggedIn ? (
          <>
            <NavLink
              to="/profile"
              style={({ isActive }) => linkStyle(isActive)}
            >
              n {user?.name?.split(" ")[0]}
            </NavLink>

            <button
              onClick={logoutHandler}
              style={{
                background: "none",
                border: "1px solid #FF6B6B",

                color: "#FF6B6B",
                padding: "4px 12px",
                borderRadius: "6px",

                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" style={({ isActive }) => linkStyle(isActive)}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
