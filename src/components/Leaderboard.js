// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points'); // Default sort by points
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5; // Number of players to show per page

  useEffect(() => {
    // Simulate fetching leaderboard data (this would be from an API in a real app)
    const mockPlayers = [
      { id: 1, name: 'Alice', points: 200, time: '1h 30m' },
      { id: 2, name: 'Bob', points: 180, time: '1h 45m' },
      { id: 3, name: 'Charlie', points: 210, time: '1h 20m' },
      { id: 4, name: 'David', points: 150, time: '2h 10m' },
      { id: 5, name: 'Eve', points: 170, time: '1h 50m' },
      { id: 6, name: 'Frank', points: 190, time: '1h 35m' },
      { id: 7, name: 'Grace', points: 160, time: '2h 00m' },
      { id: 8, name: 'Hank', points: 220, time: '1h 10m' },
    ];
    setPlayers(mockPlayers);
  }, []);

  // Handle search filtering
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function
  const sortedPlayers = filteredPlayers.sort((a, b) => {
    if (sortBy === 'points') {
      return b.points - a.points;
    } else if (sortBy === 'time') {
      return a.time.localeCompare(b.time);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="sorting-options">
        <label>
          Sort by:
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="points">Points</option>
            <option value="time">Time</option>
          </select>
        </label>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Points</th>
            <th>Completion Time</th>
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1 + (currentPage - 1) * playersPerPage}</td>
              <td>{player.name}</td>
              <td>{player.points}</td>
              <td>{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
