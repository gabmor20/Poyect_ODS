import { Router } from "express";
import { IncentivoController } from "../controller/incentivoController";

const router = Router();

// GET /incentivos
router.get("/", IncentivoController.getAll);

// GET /incentivos/entrega/:id
router.get("/entrega/:id", IncentivoController.getByEntrega);

// GET /incentivos/:id
router.get("/:id", IncentivoController.getById);


export default router;