import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";
import { validateSchema } from "../middleware/validateSchema.js";


const router = Router();
// Crear una solicitud de servicio (user)
router.post("/", authRequired);

// Ver estado de solicitudes
router.get("/my", authRequired);

// Buscar Servicios cualquiera registrado y logeado
router.get("/services", authRequired);

// Ver solicitudes de la Compañia
router.get("/:id/company/:id", authRequired );

// Cancelar solicitud
router.patch("/:id/cancel", authRequired);
// Calificar Servicio completado
router.patch("/:id/rate", authRequired);
router.patch("", authRequired);
router.patch("", authRequired);
router.patch("", authRequired);
router.patch("", authRequired);

export default router;
