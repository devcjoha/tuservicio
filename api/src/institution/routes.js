import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { institutionSchema } from "./institution.schema.js";
import { isOwnerOrAdmin } from "../middleware/isOwnerOrAdmin.js";
import { requirePermission } from "../middleware/requierePermissions.js";
import { upload } from "../middleware/upload.js";
import {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
} from "./institutionController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Crear institución
router.post("/", authRequired,  requirePermission("INST_CREATE"), upload.single("logo"), createInstitution);

// Editar institución owner o superadmin
router.patch("/:id", authRequired, isOwnerOrAdmin, validateSchema(institutionSchema), updateInstitution);

// Ver TODAS las instituciones
router.get("/", authRequired, getInstitutions);

// Ver una institución específica (admin, superadmin o owner)
router.get("/:id", authRequired, isOwnerOrAdmin, getInstitution);

// Owner ver su institución
router.get("/:id", authRequired, isOwnerOrAdmin);

// Suspender institución
router.patch("/:id/suspend", authRequired, isAdmin);

// Activar o desactivar una institución
router.patch("/:id/toggle", authRequired, isOwnerOrAdmin);

// Eliminar institución (owner o superadmin)
router.delete("/:id", authRequired, isOwnerOrAdmin, deleteInstitution);

export default router;