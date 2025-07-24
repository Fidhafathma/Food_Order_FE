// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./CartPage.css";

// const CartPage = () => {
//   const [cart, setCart] = useState({ items: [] });

//   // Fetch the user’s cart
//   const fetchCart = async () => {
//     const res = await fetch("http://localhost:5000/api/cart", {
//       credentials: "include",
//     });
//     if (res.ok) {
//       const data = await res.json();
//       setCart(data);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const updateQty = async (foodId, newQty) => {
//     if (newQty < 1) return;
//     await fetch(`http://localhost:5000/api/cart/update/${foodId}`, {
//       method: "PUT",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: newQty }),
//     });
//     fetchCart();
//   };

//   const removeItem = async (foodId) => {
//     await fetch(`http://localhost:5000/api/cart/remove/${foodId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });
//     fetchCart();
//   };

//   const placeOrder = async () => {
//     await fetch("http://localhost:5000/api/cart/clear", {
//       method: "DELETE",
//       credentials: "include",
//     });
//     alert("Order placed!");
//     fetchCart();
//   };

//   return (
//     <div className="cart-page">
//       <Link to="/dashboard" className="back">&larr; Home</Link>
//       <h2>Your Orders</h2>
//       <div className="order-list">
//         {cart.items.map(({ food, quantity }) => (
//           <div className="order-item" key={food._id}>
//             <img src={food.image} alt={food.name} />
//             <div className="info">
//               <h4>{food.name}</h4>
//               <p>₹{food.price}</p>
//               <div className="qty-controls">
//                 <button onClick={() => updateQty(food._id, quantity - 1)}>-</button>
//                 <span>{quantity}</span>
//                 <button onClick={() => updateQty(food._id, quantity + 1)}>+</button>
//               </div>
//             </div>
//             <button className="remove" onClick={() => removeItem(food._id)}>×</button>
//           </div>
//         ))}
//       </div>
//       {cart.items.length > 0 && (
//         <button className="place-order" onClick={placeOrder}>
//           Place Order
//         </button>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch the user’s cart
  const fetchCart = async () => {
    const res = await fetch("http://localhost:5000/api/cart", {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setCart(data);
      calculateTotal(data.items);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.food.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (foodId, newQty) => {
    if (newQty < 1) return;
    await fetch(`http://localhost:5000/api/cart/update/${foodId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });
    fetchCart();
  };

  const removeItem = async (foodId) => {
    await fetch(`http://localhost:5000/api/cart/remove/${foodId}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchCart();
  };

//   const placeOrder = async () => {
//     await fetch("http://localhost:5000/api/cart/clear", {
//       method: "DELETE",
//       credentials: "include",
//     });
//     alert("Order placed!");
//     fetchCart();
//   };

const placeOrder = () => {
  navigate("/checkout", { state: { cart } }); // ✅ send cart data to Checkout page
};


  return (
    <div className="cart-page">
      <Link to="/dashboard" className="back">&larr; Home</Link>
      <h2>Your Orders</h2>
      <div className="order-list">
        {cart.items.map(({ food, quantity }) => (
          <div className="order-item" key={food._id}>
            <img src={food.image} alt={food.name} />
            <div className="info">
              <h4>{food.name}</h4>
              <p>₹{food.price}</p>
              <div className="qty-controls">
                <button onClick={() => updateQty(food._id, quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => updateQty(food._id, quantity + 1)}>+</button>
              </div>
              <p className="item-total">Subtotal: ₹{food.price * quantity}</p>
            </div>
            <button className="remove" onClick={() => removeItem(food._id)}>×</button>
          </div>
        ))}
      </div>

      {cart.items.length > 0 && (
        <>
          <div className="total-section">
            <h3>Total Price: ₹{totalPrice}</h3>
          </div>
          <button className="place-order" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
