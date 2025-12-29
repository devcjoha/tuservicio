import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { companySchema } from "./company.schema.js";
import { isOwnerOrAdmin } from "../middleware/auth/isOwnerOrAdmin.js";
import { requirePermission } from "../middleware/auth/requierePermissions.js";
import { upload } from "../middleware/upload.js";
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} from "./companyController.js";
import { isAdmin } from "../middleware/auth/isAdmin.js";

const router = Router();

// Crear Compañia
router.post(
  "/",
  authRequired,
  requirePermission("COMPANY_CREATE"),
  upload.single("logo"),
  validateSchema(companySchema),
  createCompany
);

// Editar Compañia owner o superadmin
router.patch(
  "/:id",
  authRequired,
  isOwnerOrAdmin,
  validateSchema(companySchema),
  updateCompany
);

// Ver TODAS las instituciones
router.get("/", authRequired, getCompanies);

// Ver una Compañia específica (admin, superadmin o owner)
router.get("/:id", authRequired, isOwnerOrAdmin, getCompany);

// Owner ver su Compañia
router.get("/:id", authRequired, isOwnerOrAdmin);

// Suspender Compañia
router.patch("/:id/suspend", authRequired, isAdmin);

// Activar o desactivar una Compañia
router.patch("/:id/toggle", authRequired, isOwnerOrAdmin);

// Eliminar Compañia (owner o superadmin)
router.delete("/:id", authRequired, isOwnerOrAdmin, deleteCompany);

export default router;
