import { Router } from "express";
import companyRoutes from "./routes.js";

const router = Router();

router.use("/", companyRoutes);

export default router;
