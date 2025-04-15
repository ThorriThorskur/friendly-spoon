import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');  // using username instead of email
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, password };

    fetch('http://localhost:3000/api/accounts/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logged in user:', data);
        // Save user data in localStorage as a simulation of a login session.
        localStorage.setItem("user", JSON.stringify(data));
        // Redirect to a protected route, for example, /search.
        navigate('/search');
      })
      .catch(error => {
        console.error(error);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="login-page" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Login</h1>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username</label>
          <br />
          <input 
            type="text" 
            id="username" 
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '300px', padding: '8px' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <br />
          <input 
            type="password" 
            id="password" 
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '300px', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;