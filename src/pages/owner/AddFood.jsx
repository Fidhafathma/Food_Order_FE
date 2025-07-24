import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './FoodForm.css';

const AddFood = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/foods', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          restaurantId
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add food item');
      }

      navigate(`/owner/restaurants/${restaurantId}/menu`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="food-form-page">
      <Sidebar />
      <div className="food-form-container">
        <h2>Add New Food Item</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">Add Food Item</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate(`/owner/restaurants/${restaurantId}/menu`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;