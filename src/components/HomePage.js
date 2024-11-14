// src/components/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <nav className="navbar">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </nav>
        <div className="home-content">
          <h1>Welcome to Chhakrview CTF</h1>
          <p>"Unravel the layers, conquer the challenge!"</p>
          <img src="./images/image.png" alt="CTF Challenge" className="ctf-image" />
          <div className="info-box">
            <h2>About the Challenge</h2>
            <p>This CTF event will test your skills in various cybersecurity areas.</p>
            <button className="cta-button">
              <a href="/signup">Join Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
