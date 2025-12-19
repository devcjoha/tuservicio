import permissions from "./permissions.json" with { type: "json" };
import { Router } from "express";

const router = Router();
router.get("/", (req, res) => res.json(permissions));
export default router;