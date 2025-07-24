import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // import styles

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user", // default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed");
      } else {
        setMessage("Signup successful!");
        navigate("/dashboard");
        // optionally redirect
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="role-select"
        >
          <option value="user">User</option>
          <option value="restaurant_owner">Restaurant Owner</option>
          {/* Admin signup is blocked on backend */}
        </select>

        <button type="submit" className="btn-submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
