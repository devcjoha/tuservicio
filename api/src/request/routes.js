import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { isOwnerOrAdmin } from "../middleware/auth/isOwnerOrAdmin.js";

const router = Router();
// Crear una solicitud de servicio (user)
router.post("/", authRequired);

// Ver estado de solicitudes
router.get("/my", authRequired);

// Buscar Servicios cualquiera registrado y logeado
router.get("/services", authRequired);

// Ver solicitudes de la Compañia
router.get("/:id/company/:id", authRequired, isOwnerOrAdmin);

// Cancelar solicitud
router.patch("/:id/cancel", authRequired, isOwnerOrAdmin);
// Calificar Servicio completado
router.patch("/:id/rate", authRequired, isOwnerOrAdmin);
router.patch("", authRequired);
router.patch("", authRequired);
router.patch("", authRequired);
router.patch("", authRequired);

export default router;
