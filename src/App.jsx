import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './index.css'; 

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/Dashboard"
import RestaurantDetail from "./pages/RestaurantDetail";
import FoodDetail from "./pages/FoodDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProfilePage from "./pages/ProfilePage";
import LogOut from "./pages/LogOut";

import Sidebar from "./components/Sidebar";
import MyRestaurants from "./pages/owner/MyRestaurants";
import AddRestaurant from "./pages/owner/AddRestaurant";
import EditRestaurant from "./pages/owner/EditRestaurant";
import ManageMenu from "./pages/owner/Managemenu";
import AddFood from "./pages/owner/AddFood";
import EditFood from "./pages/owner/EditFood";
import Orders from "./pages/owner/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/foods/:id" element={<FoodDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<ProfilePage  />}/>
        <Route path="/logout" element={<LogOut />} />

        <Route path="/owner-restaurants" element={<MyRestaurants />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/owner/restaurants/edit/:id" element={<EditRestaurant />} />
        <Route path="/owner/restaurants/:restaurantId/menu" element={<ManageMenu />} />
        <Route path="/owner/restaurants/:restaurantId/add-food" element={<AddFood />} />
        <Route path="/owner/restaurants/:restaurantId/edit-food/:foodId" element={<EditFood />} />
        <Route path="/owner/orders" element={<Orders/>}/>
        {/* <Route path="/orders/:id" element={<Orders />} /> */}

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
