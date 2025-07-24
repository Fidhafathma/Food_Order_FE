import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";  // Import the CSS file

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Left side with text and buttons */}
      <div className="left-section">
        <h1 className="app-title">CraveOn</h1>
        <p className="subtitle">Discover and order from the best restaurants nearby with just a few taps. We’ve got you covered with a wide variety of cuisines delivered fast and fresh right to your door.</p>
        <div className="buttons">
          <Link to="/login">
            <button className="button-secondary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="button-primary">Sign Up</button>
          </Link>
        </div>
      </div>

      {/* Right side with image */}
      <div className="right-section">
        <img
          src="/FoodOrderLanding.png"  // Put this image in your public folder
          alt="Delicious food"
        />
      </div>
    </div>
  );
};

export default Landing;
