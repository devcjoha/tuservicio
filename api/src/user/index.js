import { Router } from "express";
import userRoutes from "./routes.js";

const router = Router();

router.use("/", userRoutes);

export default router;