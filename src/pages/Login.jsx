import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     //const response = await fetch("http://localhost:5000/api/users/login", {
  //     const response = await fetch("http://127.0.0.1:5000/api/users/login", {

  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //       credentials: "include", // to include cookies if backend sets them
  //     });
  //     const data = await response.json();

  //     if (!response.ok) {
  //       setMessage(data.message || "Login failed");
  //     } else {
  //       setMessage("Login successful!");
  //       navigate("/dashboard");
        

  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     setMessage(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Login failed");
    } else {
      setMessage("Login successful!");
      
      // Role-based navigation
      if (data.user.role === "user") {
        navigate("/dashboard");
      } else if (data.user.role === "restaurant_owner") {

        navigate("/owner-restaurants");
      } else if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        console.log("Received role:", data.role);
        setMessage("Unknown role");
      }
      console.log("Login Response Data:", data);

    }
  } catch (error) {
    console.error("Login Error:", error);
    setMessage(error.message);
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
