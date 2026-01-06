import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { updateUserRole } from "./userController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { updateRoleSchema } from "./user.schema.js";
import { upload } from "../middleware/upload.js";
import { updateUserAvatar } from "./userController.js";
const router = Router();

// Eliminar usuario
router.delete("/:id", authRequired, );
// Ver todos los usuarios
router.get("/", authRequired);
// Suspender Usuario
router.patch("/:id/suspend", authRequired);
// Solo superadmin puede cambiar roles
router.patch("/:id/role", authRequired, validateSchema(updateRoleSchema), updateUserRole);

router.patch(
  "/avatar", 
  authRequired, 
  upload.single("avatar"), 
  updateUserAvatar
);


export default router;