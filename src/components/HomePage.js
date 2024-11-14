// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-image">
        <div className="overlay">
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/reset-password">Reset Password</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </nav>

          <div className="home-content">
            <h1>BOTNET PRESENT-CTF Challenge</h1>
            <p>Your mission is to solve various challenges, learn, and grow as a cybersecurity expert!</p>
            <img src="/images/ctf-challenge.jpg" alt="CTF Challenge" className="ctf-image" />
            <div className="info-box">
              <h2>About the CTF Challenge</h2>
              <p>
                The Capture The Flag (CTF) challenge is a cybersecurity competition where you can test your skills in solving real-world problems in cryptography, reverse engineering, web security, and more. Join us and start competing now!
              </p>
              <button className="cta-button">
                <Link to="/signup">Join the Challenge</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
