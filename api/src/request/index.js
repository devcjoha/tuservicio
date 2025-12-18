import { Router } from "express";
import requestRoutes from "./routes.js";

const router = Router();

router.use("/", requestRoutes);

export default router;