// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import ChallengeDashboard from './components/ChallengeDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/reset-password">Reset Password</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
          </ul>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/challenges" element={<ChallengeDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
