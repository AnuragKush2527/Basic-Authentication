import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
