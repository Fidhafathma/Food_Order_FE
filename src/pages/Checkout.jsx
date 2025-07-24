import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState({ items: [] });
  const [address, setAddress] = useState({
    Name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/cart", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleConfirm = async () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("Please fill in all address fields");
      return;
    }

    // Optional: send to /api/orders
    // await fetch("http://localhost:5000/api/orders", {...});

    await fetch("http://localhost:5000/api/cart/clear", {
      method: "DELETE",
      credentials: "include",
    });

    alert("Order placed successfully!");
    navigate("/"); // or to /order-success
  };

  const total = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.food.price,
    0
  );

  return (
    <div className="checkout">
      <h2>Place your Order</h2>

      {/* Address Form */}
      <div className="address-form">
        <h3>Delivery Address</h3>
        <input placeholder="Building Name" onChange={(e) => setAddress({ ...address, name: e.target.value })} />
        <input placeholder="Phone Number" onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
        <input placeholder="Street Address" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
        <input placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        <input placeholder="Pincode" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Details</h3>
        {cart.items.map(({ food, quantity }) => (
  <div className="order-item" key={food._id}>
    <div>
      <p><strong>{food.name}</strong> x {quantity}</p>
      <p><em>Restaurant: {food.restaurant?.name || "N/A"}</em></p>
      <p>₹{food.price * quantity}</p>
    </div>
  </div>
))}


        <h4>Total: ₹{total}</h4>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
