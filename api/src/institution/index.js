import { Router } from "express";
import institutionRoutes from "./routes.js";

const router = Router();

router.use("/", institutionRoutes);

export default router;