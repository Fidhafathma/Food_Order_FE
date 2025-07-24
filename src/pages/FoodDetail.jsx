import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import "./FoodDetail.css";

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/foods/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch food");
        return res.json();
      })
      .then(data => setFood(data))
      .catch(err => setError(err.message));
  }, [id]);

  

  if (error) return <p className="error">{error}</p>;
  if (!food) return <p>Loading...</p>;

  return (
    <div className="food-detail">
       {/* ——— Navbar ——— */}
            <nav className="navbar">
              <Link to="/" className="logo">CraveOn</Link>
              <div className="nav-links">
                {/* <Link to="/profile"><FiUser size={24} /></Link> */}
                <Link to="/dashboard">Home</Link>
                <Link to="/cart"><FiShoppingCart size={24} /></Link>
                
              </div>
            </nav>
      <img src={food.image} alt={food.name} className="food-image" />
      <h2>{food.name}</h2>
      <p><strong>Price:</strong> ₹{food.price}</p>
      <p><strong>Description:</strong> {food.description}</p>
      {food.restaurant && (
        <p>
          <strong>Restaurant:</strong>{" "}
          <Link to={`/restaurants/${food.restaurant._id}`}>
            {food.restaurant.name}
          </Link>
        </p>
      )}
      <button
  className="add-btn"
  onClick={() => addToCart(food._id)}
>
  Add
</button>

    </div>
  );
};

export default FoodDetail;
