import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { isOwnerOrAdmin } from "../middleware/auth/isOwnerOrAdmin.js";


const router = Router();



export default router;