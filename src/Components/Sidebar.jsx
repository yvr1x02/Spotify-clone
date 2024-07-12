import React from "react";
import { Link } from "react-router-dom";
import spotifyIcon from "../assets/logo/logo.png";

const Sidebar = ({ searchTerm, setSearchTerm, onSearch, onReset }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <aside className="col col-2">
      <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
        <div className="container flex-column align-items-start">
          <Link className="navbar-brand" to="/" onClick={onReset}>
            <img src={spotifyIcon} alt="Spotify Logo" width="131" height="60" />
          </Link>
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <ul>
                <li>
                  <Link className="nav-item nav-link d-flex align-items-center" to="/" onClick={onReset}>
                    <i className="bi bi-house-door-fill px-3"></i> Home
                  </Link>
                </li>
                <li>
                  <Link className="nav-item nav-link d-flex align-items-center" to="/library">
                    <i className="bi bi-book-fill px-3"></i> Your Library
                  </Link>
                </li>
                <li>
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-sm h-100" onClick={() => onSearch(searchTerm)}>
                        GO
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">
            Sign Up
          </button>
          <button className="btn login-btn" type="button">
            Login
          </button>
          <Link to="/cookie-policy" className="px-1">
            Cookie Policy
          </Link>{" "}
          |<Link to="/privacy"> Privacy</Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
