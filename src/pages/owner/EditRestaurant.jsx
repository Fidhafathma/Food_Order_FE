import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import './EditRestaurant.css';

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    description: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch restaurant");
        }
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurant),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update restaurant");
      }

      navigate("/owner/restaurants");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading restaurant details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="edit-restaurant-page">
      <Sidebar />
      <div className="edit-restaurant-container">
        <h2>Edit Restaurant</h2>
        <form onSubmit={handleSubmit} className="edit-restaurant-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={restaurant.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={restaurant.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              name="image"
              value={restaurant.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            {restaurant.image && (
              <img 
                src={restaurant.image} 
                alt="Current restaurant" 
                className="current-image"
              />
            )}
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/owner/restaurants")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;