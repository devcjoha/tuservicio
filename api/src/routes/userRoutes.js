import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";
import { updateUserRole } from "../controllers/userController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { updateRoleSchema } from "../validations/user.schema.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Admin
router.get("/admin-area", authRequired, isAdmin, (req, res) => {
  res.json({ message: "Bienvenido admin"});
})

// Superadmin
router.get("/superadmin-area", authRequired, isSuperAdmin, (req, res) => {
  res.json({ message: "Bienvenido superadmin"});
})

// Solo superadmin puede cambiar roles
router.patch("/:id/role", authRequired, isSuperAdmin, validateSchema(updateRoleSchema), updateUserRole);


export default router;