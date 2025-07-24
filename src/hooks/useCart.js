// src/hooks/useCart.js
import { useCallback } from "react";

export function useCart() {
  const addToCart = useCallback(async (foodId, quantity = 1) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        credentials: "include",               // if using cookie‐based auth
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      const cart = await res.json();         // updated cart if you need it
      alert("Added to cart!");
      return cart;
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  }, []);

  return { addToCart };
}
