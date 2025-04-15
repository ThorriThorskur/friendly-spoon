import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../xStyles/Banner.css';  // Import the CSS file

const Banner = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // e.g. back to homepage
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <div className="banner">
      {!user ? (
        <>
          <Link to="/login" className="banner-link">Login</Link>
          <Link to="/register" className="banner-link">Register</Link>
        </>
      ) : (
        <div className="dropdown-container">
          <button className="username-button" onClick={toggleDropdown}>
            {user.username}
          </button>

          {dropdownOpen && (
            <div className="dropdown-box">
              <ul className="dropdown-list">
                <li className="dropdown-item">
                  <button
                    className="dropdown-button"
                    onClick={() => {
                      navigate('/settings');
                    }}
                  >
                    Settings
                  </button>
                </li>
                <li className="dropdown-item">
                  <button
                    className="dropdown-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
