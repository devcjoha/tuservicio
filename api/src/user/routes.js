import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";
import { updateUserRole } from "./userController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { updateRoleSchema } from "./user.schema.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Eliminar usuario
router.delete("/:id", authRequired, isSuperAdmin);
// Ver todos los usuarios
router.get("/", authRequired, isAdmin);
// Suspender Usuario
router.patch("/:id/suspend", authRequired, isAdmin);
// Solo superadmin puede cambiar roles
router.patch("/:id/role", authRequired, isSuperAdmin, validateSchema(updateRoleSchema), updateUserRole);


export default router;