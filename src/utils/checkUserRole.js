// utils/checkUserRole.js
export const checkUserRole = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/check-role", {
      method: "GET",
      credentials: "include", // ensures cookies (session) are sent
    });
    if (!res.ok) throw new Error("Not authorized");
    const data = await res.json();
    return data.role; // should return "user" or "restaurant_owner"
  } catch (error) {
    console.error("Error checking role:", error.message);
    return null;
  }
};
