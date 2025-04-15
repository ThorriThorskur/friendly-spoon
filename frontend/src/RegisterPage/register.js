import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the payload that matches the backend expectations.
    const payload = { username, email, password };

    fetch('https://friendly-spoon-2bsi.onrender.com/api/accounts/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Registration failed');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Registered user:', data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/search');
      })
      .catch(error => {
        console.error('Registration error:', error);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="register-page" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Register</h1>
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
          <label htmlFor="email">Email</label>
          <br />
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>Register</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
