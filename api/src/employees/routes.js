import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { isOwnerOrAdmin } from "../middleware/isOwnerOrAdmin.js";


const router = Router();



export default router;