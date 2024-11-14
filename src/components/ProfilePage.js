// src/components/ProfilePage.js
import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // State to hold user profile information
  const [profile, setProfile] = useState({
    username: 'User123',
    email: 'user@example.com',
    challengesCompleted: 10,
    points: 200,
    rank: 5,
  });

  // State to handle editable fields
  const [editMode, setEditMode] = useState(false);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    // Here, you would typically send the updated profile data to the backend
    console.log('Profile updated:', profile);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <label>Username:</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.username}</p>
        )}
      </div>
      <div className="profile-info">
        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.email}</p>
        )}
      </div>
      <div className="profile-info">
        <label>Challenges Completed:</label>
        <p>{profile.challengesCompleted}</p>
      </div>
      <div className="profile-info">
        <label>Points:</label>
        <p>{profile.points}</p>
      </div>
      <div className="profile-info">
        <label>Rank:</label>
        <p>{profile.rank}</p>
      </div>

      <div className="profile-buttons">
        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
