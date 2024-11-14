// src/components/Leaderboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://ctf-backend-03il.onrender.com",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Transform the data to match our component's structure
      const formattedData = response.data.map((player, index) => ({
        id: index + 1,
        name: player.username,
        points: player.score,
        solvedChallenges: player.solvedChallenges,
        rank: index + 1,
      }));

      setPlayers(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch leaderboard data");
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter players based on search
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort players
  const sortedPlayers = filteredPlayers.sort((a, b) => {
    if (sortBy === "score") {
      return b.points - a.points;
    } else if (sortBy === "challenges") {
      return b.solvedChallenges - a.solvedChallenges;
    }
    return 0;
  });

  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  if (loading) return <div className="loading">Loading leaderboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-select"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="score">Sort by Score</option>
          <option value="challenges">Sort by Challenges Solved</option>
        </select>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Challenges Solved</th>
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.points}</td>
              <td>{player.solvedChallenges}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
