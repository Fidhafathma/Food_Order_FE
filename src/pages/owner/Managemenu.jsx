// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Sidebar from '../../components/Sidebar';
// import './ManageMenu.css';

// const Managemenu = () => {
//   const { restaurantId } = useParams();
//   const navigate = useNavigate();
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [restaurant, setRestaurant] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch restaurant details
//         const resRestaurant = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`);
//         if (!resRestaurant.ok) throw new Error('Failed to fetch restaurant');
//         const restaurantData = await resRestaurant.json();
//         setRestaurant(restaurantData);

//         // Fetch menu items
//         const resFoods = await fetch(`http://localhost:5000/api/foods/restaurant/${restaurantId}`);
//         if (!resFoods.ok) throw new Error('Failed to fetch menu items');
//         const foodsData = await resFoods.json();
//         setFoods(foodsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [restaurantId]);

//   const handleDelete = async (foodId) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;
    
//     try {
//       const res = await fetch(`http://localhost:5000/api/foods/${foodId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
      
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || 'Delete failed');
//       }
      
//       // Refresh the list
//       setFoods(foods.filter(food => food._id !== foodId));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <div>Loading menu...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="manage-menu-page">
//       <Sidebar/>
//       <div className="manage-menu-container">
//         <div className="menu-header">
//         <h1>Manage Menu for Mandhi Mahal</h1>
//         <button 
//           className="add-food-btn"
//           onClick={() => navigate(`/owner/restaurants/${restaurantId}/add-food`)}
//         >
//           + Add New Food Item
//         </button>
//       </div>

//         {foods.length === 0 ? (
//           <p>No food items found. Add your first menu item!</p>
//         ) : (
//           <div className="food-list">
//             {foods.map(food => (
//               <div key={food._id} className="food-card">
//                 {food.image && (
//                   <img src={food.image} alt={food.name} className="food-image" />
//                 )}
//                 <div className="food-details">
//                   <h3>{food.name}</h3>
//                   <p>{food.description}</p>
//                   <p className="price">${food.price.toFixed(2)}</p>
//                 </div>
//                 <div className="food-actions">
//                   <button 
//                     onClick={() => navigate(`/owner/restaurants/${restaurantId}/edit-food/${food._id}`)}
//                     className="edit-btn"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(food._id)}
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Managemenu;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './ManageMenu.css';

const Managemenu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurant details
        const resRestaurant = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`);
        if (!resRestaurant.ok) throw new Error('Failed to fetch restaurant');
        const restaurantData = await resRestaurant.json();
        setRestaurant(restaurantData);

        // Fetch menu items
        const resFoods = await fetch(`http://localhost:5000/api/foods/restaurant/${restaurantId}`);
        if (!resFoods.ok) throw new Error('Failed to fetch menu items');
        const foodsData = await resFoods.json();
        setFoods(foodsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  const handleDelete = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${foodId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
      }
      
      // Refresh the list
      setFoods(foods.filter(food => food._id !== foodId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="page-container">
      <Sidebar/>
      <div className="content-container">Loading menu...</div>
    </div>
  );
  
  if (error) return (
    <div className="page-container">
      <Sidebar/>
      <div className="content-container error">{error}</div>
    </div>
  );

  return (
    <div className="page-container">
      <Sidebar/>
      <div className="content-container">
        <div className="manage-menu-container">
          <div className="menu-header">
            <h1>Manage Menu for {restaurant?.name || 'Restaurant'}</h1>
            <button 
              className="add-food-btn"
              onClick={() => navigate(`/owner/restaurants/${restaurantId}/add-food`)}
            >
              + Add New Food Item
            </button>
          </div>

          {foods.length === 0 ? (
            <p className="no-items">No food items found. Add your first menu item!</p>
          ) : (
            <div className="food-list">
              {foods.map(food => (
                <div key={food._id} className="food-card">
                  {food.image && (
                    <img src={food.image} alt={food.name} className="food-image" />
                  )}
                  <div className="food-details">
                    <h3>{food.name}</h3>
                    <p>{food.description}</p>
                    <p className="price">${food.price.toFixed(2)}</p>
                  </div>
                  <div className="food-actions">
                    <button 
                      onClick={() => navigate(`/owner/restaurants/${restaurantId}/edit-food/${food._id}`)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(food._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Managemenu;