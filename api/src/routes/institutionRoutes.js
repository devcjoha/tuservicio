import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { institutionSchema } from "../validations/institution.schema.js";
import { isOwnerOrAdmin } from "../middleware/isOwnerOrAdmin.js";
import {
  createInstitution,
  getInstitutions,
  getInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institutionController.js";

const router = Router();

// Cualquier usuario autenticado puede crear una institución (se convierte en owner)
router.post("/", authRequired, validateSchema(institutionSchema), createInstitution);

// Solo admin o superadmin pueden ver TODAS las instituciones
router.get("/", authRequired, getInstitutions);

// Ver una institución específica (admin, superadmin o owner)
router.get("/:id", authRequired, isOwnerOrAdmin, getInstitution);

// Actualizar institución (owner, admin o superadmin)
router.patch("/:id", authRequired, isOwnerOrAdmin, validateSchema(institutionSchema), updateInstitution);

// Eliminar institución (owner, admin o superadmin)
router.delete("/:id", authRequired, isOwnerOrAdmin, deleteInstitution);

export default router;