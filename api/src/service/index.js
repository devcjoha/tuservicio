import { Router } from "express";
import serviceRoutes from "./routes.js";

const router = Router();

router.use("/", serviceRoutes);

export default router;