import { Router } from "express";
import { AppDataSource } from "../config/data_base";
import { LoteAdapter } from "../adapter/LoteAdapter";
import { EntidadAdapter } from "../adapter/EntidadAdapter";
import { LoteApplication } from "../../application/LoteApplication";
import { LoteController } from "../controller/loteController";

const router = Router();

// Inicializar capas
const loteAdapter = new LoteAdapter(AppDataSource);
const entidadAdapter = new EntidadAdapter(AppDataSource);
const loteApp = new LoteApplication(loteAdapter, entidadAdapter);
const loteController = new LoteController(loteApp);

// Rutas
router.post("/", async (req, res) => {
    await loteController.createLote(req, res);
});

export default router;
