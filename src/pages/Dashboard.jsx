// import Navbar from "../components/Navbar";
// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [search, setSearch] = useState("");
//   const [restaurants, setRestaurants] = useState([]);
//   const [foods, setFoods] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   // Fetch top restaurants when page loads
//   useEffect(() => {
//     fetch("http://localhost:5000/api/restaurants")
//       .then((res) => res.json())
//       .then((data) => setRestaurants(data))
//       .catch((err) => console.error("Error fetching restaurants:", err));
//   }, []);

//   // Handle Search
//   const handleSearch = async () => {
//     if (!search.trim()) return;

//     // Search for restaurants
//     const res1 = await fetch(
//       `http://localhost:5000/api/restaurants/search?name=${search}`
//     );
//     const restaurantsData = await res1.json();

//     // Search for foods
//     const res2 = await fetch(
//       `http://localhost:5000/api/foods/search/${search}`
//     );
//     const foodsData = await res2.json();

//     setSearchResults({ restaurants: restaurantsData, foods: foodsData });
//   };

//   return (
//     <div>

//       {/* Search */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search for food or restaurants"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* Search Results */}
//       {searchResults?.restaurants?.length > 0 || searchResults?.foods?.length > 0 ? (
//         <div className="results">
//           <h3>Search Results:</h3>
//           {searchResults.restaurants?.map((res) => (
//             <div className="card" key={res._id}>
//               <img src={res.image} alt={res.name} />
//               <h4>{res.name}</h4>
//               <p>{res.location}</p>
//               <p>⭐ {res.rating}</p>
//             </div>
//           ))}
//           {searchResults.foods?.map((food) => (
//             <div className="card" key={food._id}>
//               <img src={food.image} alt={food.name} />
//               <h4>{food.name}</h4>
//               <p>₹{food.price}</p>
//               <p>Restaurant: {food.restaurant?.name}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           {/* Top Restaurants */}
//           <h3 className="section-title">Top Restaurants</h3>
//           <div className="restaurant-list">
//             {restaurants.map((res) => (
//               <div className="card" key={res._id}>
//                 <img src={res.image} alt={res.name} />
//                 <h4>{res.name}</h4>
//                 <p>{res.location}</p>
//                 <p>⭐ {res.rating}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

//  export default Dashboard;


// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [search, setSearch] = useState("");
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchResults, setSearchResults] = useState(null); // initially null to know if a search happened

//   // Fetch top restaurants on mount
//   useEffect(() => {
//     fetch("http://localhost:5000/api/restaurants")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Top restaurants:", data);
//         setRestaurants(data);
//       })
//       .catch((err) => console.error("Error fetching restaurants:", err));
//   }, []);

//   // Handle Search
//   const handleSearch = async () => {
//     if (!search.trim()) return;

//     try {
//       const res1 = await fetch(
//         `http://localhost:5000/api/restaurants/search?name=${search}`
//       );
//       const restaurantsData = await res1.json();
//       console.log("Restaurant search results:", restaurantsData);

//       const res2 = await fetch(
//         `http://localhost:5000/api/foods/search/${search}`
//       );
//       const foodsData = await res2.json();
//       console.log("Food search results:", foodsData);

//       setSearchResults({
//         restaurants: Array.isArray(restaurantsData) ? restaurantsData : [],
//         foods: Array.isArray(foodsData) ? foodsData : [],
//       });
//     } catch (err) {
//       console.error("Search failed:", err);
//       setSearchResults({ restaurants: [], foods: [] });
//     }
//   };

//   return (
//     <div>
//       {/* Search Bar */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search for food or restaurants"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* Display Search Results */}
//       {searchResults ? (
//         (searchResults.restaurants.length > 0 || searchResults.foods.length > 0) ? (
//           <div className="results">
//             <h3>Search Results:</h3>

//             {searchResults.restaurants.map((res) => (
//               <div className="card" key={res._id}>
//                 <img src={res.image} alt={res.name} />
//                 <h4>{res.name}</h4>
//                 <p>{res.location}</p>
//                 <p>⭐ {res.rating}</p>
//               </div>
//             ))}

//             {searchResults.foods.map((food) => (
//               <div className="card" key={food._id}>
//                 <img src={food.image} alt={food.name} />
//                 <h4>{food.name}</h4>
//                 <p>₹{food.price}</p>
//                 <p>Restaurant: {food.restaurant?.name}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p style={{ textAlign: "center" }}>No results found for "{search}"</p>
//         )
//       ) : (
//         <>
//           {/* Show Top Restaurants by Default */}
//           <h3 className="section-title">Top Restaurants</h3>
//           <div className="restaurant-list">
//             {restaurants.length > 0 ? (
//               restaurants.map((res) => (
//                 <div className="card" key={res._id}>
//                   <img src={res.image} alt={res.name} />
//                   <h4>{res.name}</h4>
//                   <p>{res.location}</p>
//                   <p>⭐ {res.rating}</p>
//                 </div>
//               ))
//             ) : (
//               <p style={{ textAlign: "center" }}>Loading restaurants...</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from 'react-icons/fi'

import "./Dashboard.css";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const { addToCart } = useCart(); 

  // 1. Load top restaurants
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login"; // redirect after logout
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  // 2. Search handler
  const handleSearch = async () => {
    if (!search.trim()) return;
    const [rRes, fRes] = await Promise.all([
      fetch(`http://localhost:5000/api/restaurants/search?name=${encodeURIComponent(search)}`),
      fetch(`http://localhost:5000/api/foods/search/${encodeURIComponent(search)}`)
    ]);
    const [rData, fData] = await Promise.all([
      rRes.ok ? rRes.json() : [],
      fRes.ok ? fRes.json() : []
    ]);
    setSearchResults({
      restaurants: Array.isArray(rData) ? rData : [],
      foods: Array.isArray(fData) ? fData : []
    });
  };

  return (
    <div className="dashboard">
      {/* ——— Navbar ——— */}
      <nav className="navbar">
        <Link to="/" className="logo">CraveOn</Link>
        <div className="nav-links">
          <Link to="/profile"><FiUser size={24} /></Link>
          <Link to="/dashboard">Home</Link>
          <Link to="/cart"><FiShoppingCart size={24} /></Link>
          <Link to="/"><FiLogOut size={24}/></Link>
    
        </div>
      </nav>

      {/* ——— Hero/Search Banner ——— */}
      <section className="hero">
        <h2>Craving something delicious?</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by your favourite dish or restaurant"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* ——— Results or Top Restaurants ——— */}
      {searchResults ? (
        searchResults.restaurants.length + searchResults.foods.length > 0 ? (
          <section className="results">
            <h3>Search Results</h3>
            <div className="cards">
              {searchResults.restaurants.map(r => (
                // <div className="card" key={r._id}>
                  <Link to={`/restaurants/${r._id}`} className="card" key={r._id}>
                  <img src={r.image} alt={r.name} />
                  <h4>{r.name}</h4>
                  <p>{r.location}</p>
                  <p>⭐ {r.rating}</p>
                 {/* </div> */}
                </Link>
              ))}
              {searchResults.foods.map(f => (
                // <div className="card" key={f._id}>\\
                <div>
                <Link to={`/foods/${f._id}`}  className="card" key={f._id}>
                  <img src={f.image} alt={f.name} />
                  <h4>{f.name}</h4>
                  <p>₹{f.price}</p>
                   <p>Restaurant: {f.restaurant?.name}</p>
                {/* </div> */}
                </Link>
                <button
          className="add-btn" 
          onClick={() => addToCart(f._id)}
        >
          Add
        </button>
              </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="no-results">No results for “{search}”</p>
        )
      ) : (
        <section className="top-restaurants">
          <h3>Top Restaurants</h3>
          <div className="cards">
            {restaurants.map(r => (
              <Link to={`/restaurants/${r._id}`} className="card" key={r._id}>
                <img src={r.image} alt={r.name} />
                <h4>{r.name}</h4>
                <p>{r.location}</p>
                <p>⭐ {r.rating}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
