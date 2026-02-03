import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/AuthSlice";
import { post } from "../services/ApiEndpoint";

export default function Home() {
  const user = useSelector((state) => state.Auth.user);

  if (!user) return null;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await post("/api/auth/logout");
    dispatch(logout());
  };

  return (
    <div className="home-container">
      <div className="user-card">
        <h2>Welcome</h2>
        <p>Role: {user.role}</p>
        <p>You are logged in</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
