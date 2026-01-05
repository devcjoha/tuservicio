import permissions from "./permissions.json" with { type: "json" };
import { Router } from "express";
import { authRequired } from "../middleware/auth/authRequired.js";

const router = Router();

router.get("/", authRequired, (req, res) => {
  res.json(permissions);
});

export default router;