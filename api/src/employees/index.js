import { Router } from "express";
import employeesRoutes from "./routes.js";

const router = Router();

router.use("/", employeesRoutes);

export default router;