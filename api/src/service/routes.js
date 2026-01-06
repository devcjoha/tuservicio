import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { serviceSchema } from "./service.schema.js";

import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} from "./serviceController.js";

const router = Router();

// Crear servicio (owner, admin o superadmin)
router.post(
  "/",
  authRequired,
  validateSchema(serviceSchema),
  createService
);

// Listar servicios (admin o superadmin)
router.get("/", authRequired, getServices);

// Obtener un servicio (admin, superadmin o owner del proveedor)
router.get("/company/:id", authRequired, getService);

// Editar servicio (owner, admin o superadmin)
router.patch("/company/:id", authRequired, updateService);

// Eliminar servicio (owner, admin o superadmin)
router.delete("/company/:id", authRequired, deleteService);

export default router;
