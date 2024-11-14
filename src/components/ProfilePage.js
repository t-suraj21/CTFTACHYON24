// src/components/ProfilePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/profile",
        { email: profile.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
      fetchProfile();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <label>Username:</label>
        <p>{profile.username}</p>
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
