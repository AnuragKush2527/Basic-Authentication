import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function PublicLayout() {
  const { user, loading } = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return <Outlet />;
}
