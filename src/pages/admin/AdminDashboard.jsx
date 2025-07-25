
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaUsers, FaUserCheck, FaStore, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState('');
    const [showMenuId, setShowMenuId] = useState(null);
    const toggleMenu = (id) => {
        setShowMenuId(prev => prev === id ? null : id);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setError('');
            // Fetch users with credentials
            const usersRes = await fetch('http://localhost:5000/api/users/all-users', {
                credentials: 'include',
            });
            if (!usersRes.ok) {
                const errData = await usersRes.json();
                throw new Error(errData.message || 'Failed to fetch users');
            }
            const usersData = await usersRes.json();
            setUsers(usersData);

            // Fetch restaurants with credentials
            const restaurantRes = await fetch('http://localhost:5000/api/restaurants', {
                credentials: 'include',
            });
            if (!restaurantRes.ok) {
                const errData = await restaurantRes.json();
                throw new Error(errData.message || 'Failed to fetch restaurants');
            }
            const restaurantData = await restaurantRes.json();
            setRestaurants(restaurantData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message || 'Error fetching data');
            setUsers([]);
            setRestaurants([]);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure to delete this user?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to delete user');
            }
            fetchData();
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert(error.message || 'Failed to delete user');
        }
    };

    const deleteRestaurant = async (id) => {
        if (!window.confirm('Are you sure to delete this restaurant?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to delete restaurant');
            }
            fetchData();
        } catch (error) {
            console.error('Failed to delete restaurant:', error);
            alert(error.message || 'Failed to delete restaurant');
        }
    };

    const customers = users.filter(user => user.role === 'user');
    const owners = users.filter(user => user.role === 'restaurant_owner');

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome!</h1>
                <p>Manage your food ordering platform</p>
            </header>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="stats-cards">
                <div className="card">
                    <FaUsers className="icon" />
                    <h2>{customers.length}</h2>
                    <p>Total Customers</p>
                </div>
                <div className="card">
                    <FaUserCheck className="icon" />
                    <h2>{owners.length}</h2>
                    <p>Restaurant Owners</p>
                </div>
                <div className="card">
                    <FaStore className="icon" />
                    <h2>{restaurants.length}</h2>
                    <p>Total Restaurants</p>
                </div>
            </div>

            <div className="tabs">
                <button
                    className={activeTab === 'customers' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('customers')}
                >
                    Customers
                </button>
                <button
                    className={activeTab === 'owners' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('owners')}
                >
                    Restaurant Owners
                </button>
                <button
                    className={activeTab === 'restaurants' ? 'tab active' : 'tab'}
                    onClick={() => setActiveTab('restaurants')}
                >
                    Restaurants
                </button>
            </div>

            <div className="tab-content">

                {(activeTab === 'customers' || activeTab === 'owners') && (
                    <div className="full-width-cards-container">
                        {(activeTab === 'customers' ? customers : owners).map(user => (
                            <div key={user._id} className="full-width-card">
                                <div className="card-details">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                                </div>
                                <button className="delete-btn small-btn" onClick={() => deleteUser(user._id)} title="Delete">
                                    Delete
                                </button>


                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'restaurants' && (
                    <div className="full-width-cards-container">
                        {restaurants.map(res => (

                            <div key={res._id} className="full-width-card restaurant-card">
                                <div className="card-details">
                                    <p><strong>Name:</strong> {res.name}</p>
                                    <p><strong>Location:</strong> {res.location}</p>
                                    <p><strong>Rating:</strong> {res.rating}</p>
                                    {res.image && (
                                        <img src={res.image} alt="Restaurant" className="restaurant-image" />
                                    )}

                                </div>

                                <button className="delete-btn small-btn" onClick={() => deleteRestaurant(res._id)} title="Delete">
                                    Delete
                                </button>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
