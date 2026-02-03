import express from "express";
import { checkUser, login, logout, register } from "../controllers/Auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.post("/logout", verifyToken, logout);
AuthRoutes.get("/check-user", verifyToken, checkUser);

export default AuthRoutes;
