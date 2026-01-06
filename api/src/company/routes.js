import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { companySchema } from "./company.schema.js";

import { requirePermission } from "../middleware/auth/requierePermissions.js";
import { upload } from "../middleware/upload.js";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "./companyController.js";


const router = Router();

// Crear Compañia
router.post(
  "/",
  authRequired,
  requirePermission("301"),
  upload.single("logo"),
  validateSchema(companySchema),
  createCompany
);

// Editar Compañia owner o superadmin
router.patch(
  "/:id",
  authRequired,
  requirePermission("302"),
  validateSchema(companySchema),
  updateCompany
);
// Eliminar Compañia (owner o superadmin)
router.delete(
  "/:id",
  authRequired,
  requirePermission("303"),
  deleteCompany
);
// Activar o desactivar una Compañia
router.patch("/:id/toggle", authRequired, requirePermission("304"));

// Ver una Compañia específica (admin, superadmin o owner)
router.get("/:id", authRequired, requirePermission("305"), getCompanyById);
// Ver TODAS las instituciones
router.get("/", authRequired, requirePermission("306"), getCompanies);

// Suspender Compañia
router.patch("/:id/suspend", authRequired, requirePermission("307"));

export default router;
