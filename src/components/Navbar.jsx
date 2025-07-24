import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">FoodieDash</h2>
      <div className="nav-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
