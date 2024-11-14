// src/components/ChallengeDashboard.js
import React, { useState } from 'react';
import './ChallengeDashboard.css';

const challenges = [
  { id: 1, title: 'Challenge 1', difficulty: 'Easy', status: 'Unlocked', description: 'Solve a basic SQL injection vulnerability.' },
  { id: 2, title: 'Challenge 2', difficulty: 'Medium', status: 'Locked', description: 'Explore Cross-Site Scripting (XSS) in a form.' },
  { id: 3, title: 'Challenge 3', difficulty: 'Hard', status: 'Locked', description: 'Bypass authentication using CSRF techniques.' },
  // Add more challenges as needed
];

const ChallengeDashboard = () => {
  const [completed, setCompleted] = useState([false, false, false]); // Track completion status

  const handleComplete = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = true;
    setCompleted(newCompleted);
  };

  return (
    <div className="dashboard">
      <h2>CTF Challenge Dashboard</h2>
      <div className="challenge-list">
        {challenges.map((challenge, index) => (
          <div className="challenge-card" key={challenge.id}>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
              Difficulty: {challenge.difficulty}
            </span>
            <span className="status">
              Status: {completed[index] ? 'Completed' : challenge.status}
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: completed[index] ? '100%' : '0%' }}
              ></div>
            </div>
            <button onClick={() => handleComplete(index)}>
              {completed[index] ? 'Challenge Completed' : 'Start Challenge'}
            </button>
            <button className="hint-button">View Hint</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeDashboard;
