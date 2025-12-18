import { Router } from "express";
import { register, login, logout } from "./authController.js";
import { authRequired } from "../middleware/authRequired.js";
import { getUserProfile } from "../user/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// Ruta protegida usuario
router.get("/profile", authRequired, getUserProfile);

export default router;
