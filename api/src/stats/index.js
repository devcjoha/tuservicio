import { Router } from "express";
import statsRoutes from "./routes.js";

const router = Router();

router.use("/", statsRoutes);

export default router;