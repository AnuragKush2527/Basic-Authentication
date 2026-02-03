import React, { useEffect, useState } from "react";
import { get, deleteUser } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await get("/api/admin/users");
        setUsers(res.data.users);
      } catch {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await post("/api/auth/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(`/api/admin/users/${id}`);
      toast.success(res.data.message);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-container">
      <h2>You are admin! Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleLogout}
        className="logout-btn"
        style={{ marginBottom: "20px" }}
      >
        Logout
      </button>
    </div>
  );
}
