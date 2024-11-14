import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const API_URL = "https://ctf-backend-03il.onrender.com";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store JWT token
      localStorage.setItem("token", response.data.access_token);

      // Store username for display purposes
      localStorage.setItem("username", response.data.username);

      // Navigate to home page
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError("An error occurred during login.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

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

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      <div className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;
