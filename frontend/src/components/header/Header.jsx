import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <Link to="/" className="logo" onClick={closeMenu}>
        THE VIRTUAL CAMPUS
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {menuOpen && (
        <div className="nav-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/courses" onClick={closeMenu}>
          Courses
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        {isAuth ? (
          <Link to="/account" onClick={closeMenu}>
            Account
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
