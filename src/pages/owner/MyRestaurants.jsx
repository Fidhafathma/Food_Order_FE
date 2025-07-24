
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import './MyRestaurants.css';

const MyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/restaurants/owner", {
        credentials: "include", // send cookie for auth
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch restaurants");
      }
      const data = await res.json();
      setRestaurants(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this restaurant?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }
      // Refresh list
      fetchRestaurants();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div >
      <Sidebar />
      <div  className="my-restaurants-container">
        <h2>My Restaurants</h2>
        <button className="add-restaurant-btn" 
        onClick={() => navigate("/add-restaurant")} >
          Add New Restaurant
        </button>
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <ul>
            {restaurants.map((rest) => (
              <li key={rest._id} >
                <h3>{rest.name}</h3>
                <p>Location: {rest.location || "N/A"}</p>
                {rest.image && <img src={rest.image} alt={rest.name} width={200}  />}
                <div>
                  <button onClick={() => navigate(`/owner/restaurants/${rest._id}/menu`)}>
                     Manage Menu
                  </button>
                  <button onClick={() => navigate(`/owner/restaurants/edit/${rest._id}`)} >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(rest._id)}
                    className="delete-btn"
                    >
                Delete
                 </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyRestaurants;
