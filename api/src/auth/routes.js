import { Router } from "express";
import {
  register,
  login,
  logout,
  getPermissionsByCode,
  getPermissions,
  createPermission,
  updatePermission,
  refresh,
  resetPassword,
  resendVerifyEmail,
} from "./authController.js";
import { authRequired } from "../middleware/auth/authRequired.js";
import { getUserProfile } from "../user/userController.js";
import { requirePermission } from "../middleware/auth/requierePermissions.js";
import { checkSuperadmin } from "../middleware/auth/checkSuperadmin.js";
import { emailVerificationToken } from "../middleware/auth/emailVerificationToken.js";
import { trackSession } from "../middleware/auth/trackSession.js";
import { validateSchema } from "../middleware/validateSchema.js";
import {
  loginSchema,
  // registerSchema,
  resetPasswordSchema,
} from "./auth.schema.js";

const router = Router();

router.post(
  "/register",
  trackSession,
  // validateSchema(registerSchema),
  register
);
router.post("/login", trackSession, validateSchema(loginSchema), login);
//envío email de verificación de registro
router.get("/verify-email/:token", emailVerificationToken);
//reenvío de email de registro
router.post("/verify-email", authRequired, resendVerifyEmail);
// sessión usuario
router.get("/profile", authRequired, getUserProfile);
//Cambiar Password
router.patch(
  "/reset-password/:token",
  validateSchema(resetPasswordSchema),
  resetPassword
);
// Refrescar sessión
router.post("/refresh", refresh);
//Logout
router.post("/logout", authRequired, logout);

//Permissions
router.get(
  "/permissions",
  authRequired,
  checkSuperadmin,
  requirePermission("900"),
  getPermissions
);
router.get(
  "/permissions/:code",
  authRequired,
  checkSuperadmin,
  requirePermission("910"),
  getPermissionsByCode
);
router.patch(
  "/permissions/:code",
  authRequired,
  checkSuperadmin,
  requirePermission("911"),
  updatePermission
);
router.post(
  "/permissions",
  authRequired,
  checkSuperadmin,
  requirePermission("912"),
  createPermission
);

export default router;
