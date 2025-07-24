import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './FoodForm.css';

const EditFood = () => {
  const { restaurantId, foodId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/foods/${foodId}`);
        if (!res.ok) throw new Error('Failed to fetch food item');
        const data = await res.json();
        setFormData({
          name: data.name,
          image: data.image,
          description: data.description,
          price: data.price.toString()
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [foodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${foodId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update food item');
      }

      navigate(`/owner/restaurants/${restaurantId}/menu`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="food-form-page">
      <Sidebar />
      <div className="food-form-container">
        <h2>Edit Food Item</h2>
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
            <button type="submit" className="save-btn">Save Changes</button>
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

export default EditFood;