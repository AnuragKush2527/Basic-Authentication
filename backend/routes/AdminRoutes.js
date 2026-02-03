import express from "express";
import { getUsers, deleteUser } from "../controllers/Admin.js";
import { verifyToken, isAdmin } from "../middleware/verifyToken.js";

const AdminRoutes = express.Router();

AdminRoutes.get("/users", verifyToken, isAdmin, getUsers);
AdminRoutes.delete("/users/:id", verifyToken, isAdmin, deleteUser);

export default AdminRoutes;
