import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  logout,
  selectUser,
  selectIsLoggedIn,
  selectIsAdmin,
} from "../store/authSlice";
import { selectTotalItems } from "../store/cartSlice";
import SearchBox from "./SearchBox";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const totalItems = useSelector(selectTotalItems);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#161B22",
        borderBottom: "1px solid #30363D",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          color: "#9B6DD4",
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Shopease
      </Link>
      <SearchBox/>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            color: isActive ? "#9B6DD4" : "#8B949E",
            textDecoration: "none",
          })}
        >
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

        {isAdmin && (
          <NavLink
            to="/admin/products"
            style={({ isActive }) => ({
              color: isActive ? "#9B6DD4" : "#8B949E",
              textDecoration: "none",
            })}
          >
            Admin
          </NavLink>
        )}

        {isLoggedIn ? (
          <>
            <span style={{ color: "#E6EDF3" }}>
              n {user?.name?.split(" ")[0]}
            </span>

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
          <NavLink
            to="/login"
            style={{ color: "#8B949E", textDecoration: "none" }}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
