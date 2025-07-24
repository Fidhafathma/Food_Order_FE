import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./RestaurantDetail.css"; // create your own styles

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch restaurant");
        return res.json();
      })
      .then((data) => setRestaurant(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="restaurant-detail">
         {/* ——— Navbar ——— */}
              <nav className="navbar">
                <Link to="/" className="logo">CraveOn</Link>
                <div className="nav-links">
                  {/* <Link to="/profile"><FiUser size={24} /></Link> */}
                  <Link to="/dashboard">Home</Link>
                  <Link to="/cart"><FiShoppingCart size={24} /></Link>
            
                </div>
              </nav>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="detail-image"
      />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.location}</p>
      <p>⭐ {restaurant.rating}</p>
      <h3>Menu</h3>
      <ul className="menu-list">
        {restaurant.menu && restaurant.menu.length > 0 ? (
          restaurant.menu.map((item) => (
            <li key={item._id} className="menu-item">
                <Link to={`/foods/${item._id}`} className="menu-link">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
              </Link>
              <button
          className="add-btn"
          onClick={() => addToCart(item._id)}
        >
          Add
        </button>
            </li>
          ))
        ) : (
          <p>No items in menu.</p>
        )}
      </ul>
    </div>
  );
};

export default RestaurantDetail;
