// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import "./Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true, // ✅ Send cookies with request
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="profile-container">
         <nav className="navbar">
                <Link to="/" className="logo">CraveOn</Link>
                <div className="nav-links">
                  <Link to="/profile"><FiUser size={24} /></Link>
                  <Link to="/dashboard">Home</Link>
                  <Link to="/cart"><FiShoppingCart size={24} /></Link>
            
                </div>
              </nav>
      <h2>My Profile</h2>
      <div className="profile-field">
        <label>Name:</label>
        <input type="text" value={user.name} disabled />
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <input type="text" value={user.email} disabled />
      </div>
      <div className="profile-field">
        <label>Phone:</label>
        <input type="text" value={user.phone} disabled />
      </div>
      <div className="profile-field">
        <label>Role:</label>
        <input type="text" value={user.role} disabled />
      </div>
    </div>
  );
};

export default ProfilePage;
