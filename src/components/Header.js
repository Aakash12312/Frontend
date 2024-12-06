import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, userName, handleLogout }) => {
  return (
    <header
      style={{
        backgroundColor: "#1E201E",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>THOUGHTLY</div>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
          Home
        </Link>
        {!isLoggedIn ? (
          <Link to="/user/login" style={{ color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            Login/Register
          </Link>
        ) : (
          <>
            <Link to ="/blog/addBlog" style={{ color: "white", textDecoration: "none", fontSize: "0.9rem" }}>
            AddBlog
            </Link>
            <span style={{ color: "white", fontWeight: "bold", fontSize: "0.9rem" }}>{userName}</span>
            <span
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
