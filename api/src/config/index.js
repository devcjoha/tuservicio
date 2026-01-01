import permissions from "./permissions.json" with { type: "json" };
import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";

const router = Router();

router.get("/", authRequired, (req, res) => {
  res.json(permissions);
});
// router.get("/", authRequired, (req, res) => {
//   // Enviamos las acciones para que el front sepa qué existe
//   // Enviamos los roles solo si el usuario es admin (opcional)
//   res.json({
//     actions: permissions.actions, 
//     roles: req.user.role === 'admin' ? permissions.roles : null 
//   });
// });

export default router;