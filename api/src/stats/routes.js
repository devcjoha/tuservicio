import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";


const router = Router();



export default router;