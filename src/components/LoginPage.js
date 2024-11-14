// src/components/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Optional: for custom styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Assuming the response contains a token or user info
      if (response.data.success) {
        // Redirect to challenge dashboard or home page
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>CTF Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="links">
        <a href="/reset-password">Forgot Password?</a>
        <span> | </span>
        <a href="/signup">Create Account</a>
      </div>
    </div>
  );
};

export default LoginPage;
