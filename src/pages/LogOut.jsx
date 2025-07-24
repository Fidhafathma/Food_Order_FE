import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users/logout", {
      method: "POST", // or GET depending on your backend
      credentials: "include",
    })
      .then(() => {
        // Clear any client-side stored data (localStorage, context, etc)
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
