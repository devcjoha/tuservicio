import { Router } from "express";
import { register, login, logout } from "./authController.js";
import { authRequired } from "../middleware/auth/authRequired.js";
import { getUserProfile } from "../user/userController.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
// Ruta protegida usuario
router.post("/logout", authRequired, logout);
router.get("/profile", authRequired, getUserProfile);

export default router;
