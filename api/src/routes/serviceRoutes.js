import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { serviceSchema } from "../validations/service.schema.js";
import { isOwnerOrAdmin } from "../middleware/isOwnerOrAdmin.js";

import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = Router();

// Crear servicio (owner, admin o superadmin)
router.post("/", authRequired, validateSchema(serviceSchema), isOwnerOrAdmin, createService);

// Listar servicios (admin o superadmin)
router.get("/", authRequired, getServices);

// Obtener un servicio (admin, superadmin o owner del proveedor)
router.get("/:id", authRequired, isOwnerOrAdmin, getService);

// Actualizar servicio (owner, admin o superadmin)
router.patch("/:id", authRequired, isOwnerOrAdmin, updateService);

// Eliminar servicio (owner, admin o superadmin)
router.delete("/:id", authRequired, isOwnerOrAdmin, deleteService);

export default router;