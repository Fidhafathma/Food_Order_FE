import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddRestaurant.css';
const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Restaurant name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/restaurants", {
        method: "POST",
        credentials: "include", // send cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add restaurant");
      }

      // On success, navigate back to owner restaurants list
      navigate("/owner-restaurants");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-restaurant-container">
      <h2>Add New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant Name<span style={{ color: "red" }}>*</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State, etc."
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
