// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2 className="sidebar-title">Owner Panel</h2>
//       <nav className="sidebar-nav">
//         <NavLink to="/owner" className="sidebar-link" end>
//           My Restaurants
//         </NavLink>
//         <NavLink to="/owner/add-restaurant" className="sidebar-link">
//           Add Restaurant
//         </NavLink>
//         <NavLink to="/owner/orders" className="sidebar-link">
//           Orders
//         </NavLink>
//         <NavLink to="/logout" className="sidebar-link logout-link">
//           Logout
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Owner Panel</h2>
      <nav className="sidebar-nav">
        <NavLink 
          to="/owner-restaurants" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          end
        >
          My Restaurants
        </NavLink>
        <NavLink 
          to="/owner/orders" 
          className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
        >
          Orders
        </NavLink>
        <NavLink 
          to="/logout" 
          className="sidebar-link logout-link"
        >
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
