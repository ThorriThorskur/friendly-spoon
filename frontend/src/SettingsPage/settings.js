import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../xStyles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [newEmail, setNewEmail] = useState(user ? user.email : '');
  const [newPassword, setNewPassword] = useState('');
  const [darkMode, setDarkMode] = useState(user ? Boolean(user.darkmode) : false);
  const [usernameMsg, setUsernameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const originalUsernameRef = useRef(newUsername);
  const usernameRowRef = useRef(null);

  const originalEmailRef = useRef(newEmail);
  const emailRowRef = useRef(null);

  const originalPasswordRef = useRef(newPassword);
  const passwordRowRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#2f2f2f' : '#ffffff';
  }, [darkMode]);

  useEffect(() => {
    if (isUsernameEditable) {
      // Store original
      originalUsernameRef.current = newUsername;
      document.addEventListener('click', handleOutsideClickUsername);
    } else {
      document.removeEventListener('click', handleOutsideClickUsername);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClickUsername);
    };
  }, [isUsernameEditable, newUsername]);

  const handleOutsideClickUsername = (e) => {
    if (!usernameRowRef.current) return;
    if (usernameRowRef.current.contains(e.target)) return;
    // revert
    setNewUsername(originalUsernameRef.current);
    setIsUsernameEditable(false);
  };

  useEffect(() => {
    if (isEmailEditable) {
      originalEmailRef.current = newEmail;
      document.addEventListener('click', handleOutsideClickEmail);
    } else {
      document.removeEventListener('click', handleOutsideClickEmail);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClickEmail);
    };
  }, [isEmailEditable, newEmail]);

  const handleOutsideClickEmail = (e) => {
    if (!emailRowRef.current) return;
    if (emailRowRef.current.contains(e.target)) return;
    // revert
    setNewEmail(originalEmailRef.current);
    setIsEmailEditable(false);
  };

  useEffect(() => {
    if (isPasswordEditable) {
      originalPasswordRef.current = newPassword;
      document.addEventListener('click', handleOutsideClickPassword);
    } else {
      document.removeEventListener('click', handleOutsideClickPassword);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClickPassword);
    };
  }, [isPasswordEditable, newPassword]);

  const handleOutsideClickPassword = (e) => {
    if (!passwordRowRef.current) return;
    if (passwordRowRef.current.contains(e.target)) return;
    // revert
    setNewPassword(originalPasswordRef.current);
    setIsPasswordEditable(false);
  };

  // --- Endpoint calls ---
  const handleUsernameSubmit = () => {
    fetch('http://localhost:3000/api/accounts/change-username', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: user.id,
        newUserName: newUsername,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Unable to change username');
          });
        }
        return response.json();
      })
      .then(updatedUser => {
        setUsernameMsg('Username updated successfully.');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsUsernameEditable(false);
      })
      .catch(error => {
        setUsernameMsg(error.message);
      });
  };

  const handleEmailSubmit = () => {
    fetch('http://localhost:3000/api/accounts/change-email', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: user.id,
        newEmail,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Failed to change email');
          });
        }
        return response.json();
      })
      .then(updatedUser => {
        setEmailMsg('Email updated successfully.');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEmailEditable(false);
      })
      .catch(error => {
        setEmailMsg(error.message);
      });
  };

  const handlePasswordSubmit = () => {
    fetch('http://localhost:3000/api/accounts/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: user.id,
        oldPassword: user.password,
        newPassword,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Failed to change password');
          });
        }
        return response.json();
      })
      .then(updatedUser => {
        setPasswordMsg('Password updated successfully.');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setNewPassword('');
        setIsPasswordEditable(false);
      })
      .catch(error => {
        setPasswordMsg(error.message);
      });
  };

  // Dark mode toggle => PUT /api/accounts/change-darkmode
  const handleDarkModeToggle = (e) => {
    const checked = e.target.checked;
    setDarkMode(checked);

    const darkmodeValue = checked ? 1 : 0;
    fetch('http://localhost:3000/api/accounts/change-darkmode', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: user.id,
        darkmode: darkmodeValue,
      })
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Unable to update dark mode');
          });
        }
        return response.json();
      })
      .then(updatedUser => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(error => {
        console.error('Error updating dark mode:', error);
      });
  };

  // Logging out
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="settings-container">
      <Link to="/" className="back-arrow">←</Link>
      <h1>Settings</h1>

      {/* USERNAME ROW*/}
      <div className="settings-row" ref={usernameRowRef}>
        <label>User name:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={!isUsernameEditable}
          className={!isUsernameEditable ? 'input-disabled' : ''}
        />
        {!isUsernameEditable ? (
          <button
            className="edit-button"
            onClick={() => {
              setIsUsernameEditable(true);
              setUsernameMsg('');
            }}
          >
            Edit
          </button>
        ) : (
          <button className="save-button" onClick={handleUsernameSubmit}>
            Save
          </button>
        )}
      </div>
      {usernameMsg && <p className="message">{usernameMsg}</p>}

      {/* EMAIL ROW */}
      <div className="settings-row" ref={emailRowRef}>
        <label>Email:</label>
        <input 
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={!isEmailEditable}
          className={!isEmailEditable ? 'input-disabled' : ''}
        />
        {!isEmailEditable ? (
          <button
            className="edit-button"
            onClick={() => {
              setIsEmailEditable(true);
              setEmailMsg('');
            }}
          >
            Edit
          </button>
        ) : (
          <button className="save-button" onClick={handleEmailSubmit}>
            Save
          </button>
        )}
      </div>
      {emailMsg && <p className="message">{emailMsg}</p>}

      {/* PASSWORD ROW */}
      <div className="settings-row" ref={passwordRowRef}>
        <label>Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={!isPasswordEditable}
          className={!isPasswordEditable ? 'input-disabled' : ''}
        />
        {!isPasswordEditable ? (
          <button
            className="edit-button"
            onClick={() => {
              setIsPasswordEditable(true);
              setPasswordMsg('');
            }}
          >
            Edit
          </button>
        ) : (
          <button className="save-button" onClick={handlePasswordSubmit}>
            Save
          </button>
        )}
      </div>
      {passwordMsg && <p className="message">{passwordMsg}</p>}

      {/* DARK MODE */}
      <div className="settings-row">
        <label>Dark Mode:</label>
        <label className="switch">
          <input 
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* LOGOUT */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Settings;