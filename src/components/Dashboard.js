// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStatus, setUserStatus] = useState(null);

  // Fetch challenges and leaderboard data when the component mounts
  useEffect(() => {
    // Fetch challenges data (mocked here for the example)
    axios.get('http://localhost:5000/challenges') // Adjust the endpoint for challenges
      .then((response) => {
        setChallenges(response.data);
      })
      .catch((error) => {
        console.error("Error fetching challenges", error);
      });

    // Fetch leaderboard data (mocked here for the example)
    axios.get('http://localhost:5000/leaderboard') // Adjust the endpoint for leaderboard
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard", error);
      });

    // Fetch user status (mocked here for the example)
    axios.get('http://localhost:5000/user-status') // Adjust the endpoint for user status
      .then((response) => {
        setUserStatus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user status", error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to the CTF Dashboard</h2>

      <section className="user-status">
        <h3>Your Progress</h3>
        {userStatus ? (
          <div>
            <p><strong>Username:</strong> {userStatus.username}</p>
            <p><strong>Challenges Solved:</strong> {userStatus.solvedChallenges}</p>
            <p><strong>Score:</strong> {userStatus.score}</p>
          </div>
        ) : (
          <p>Loading user progress...</p>
        )}
      </section>

      <section className="challenges">
        <h3>Available Challenges</h3>
        <div className="challenge-list">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="challenge-card">
                <h4>{challenge.title}</h4>
                <p>{challenge.description}</p>
                <button onClick={() => window.location.href = challenge.url}>Start Challenge</button>
              </div>
            ))
          ) : (
            <p>No challenges available.</p>
          )}
        </div>
      </section>

      <section className="leaderboard">
        <h3>Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
              <th>Challenges Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr key={user.username}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                  <td>{user.solvedChallenges}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Loading leaderboard...</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
