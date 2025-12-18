import { Router } from "express";
import supportRoutes from "./routes.js";

const router = Router();

router.use("/", supportRoutes);

export default router;