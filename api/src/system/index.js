import { Router } from "express";
import systemRoutes from "./routes.js";

const router = Router();

router.use("/", systemRoutes);

export default router;