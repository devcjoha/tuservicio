import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { serviceSchema } from "./service.schema.js";
import { isOwnerOrAdmin } from "../middleware/isOwnerOrAdmin.js";

import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "./serviceController.js";

const router = Router();

// Crear servicio (owner, admin o superadmin)
router.post("/", authRequired, validateSchema(serviceSchema), isOwnerOrAdmin, createService);

// Listar servicios (admin o superadmin)
router.get("/", authRequired, getServices);

// Obtener un servicio (admin, superadmin o owner del proveedor)
router.get("/institution/:id", authRequired, isOwnerOrAdmin, getService);

// Editar servicio (owner, admin o superadmin)
router.patch("/institution/:id", authRequired, isOwnerOrAdmin, updateService);

// Eliminar servicio (owner, admin o superadmin)
router.delete("/institution/:id", authRequired, isOwnerOrAdmin, deleteService);

export default router;