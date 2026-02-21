import { BeneficiarioApplication } from "../../application/BeneficiarioApplication";
import { BeneficiarioAdapter } from "../adapter/BeneficiarioAdapter";
import { AppDataSource } from "../config/data_base";
import { BeneficiarioController } from "../controller/beneficiarioController";
import {Request, Response} from "express";
import { Router } from "express";

const router = Router();

//inicialización de las capas
const beneficiarioAdapter = new BeneficiarioAdapter(AppDataSource);
const beneficiarioApp = new BeneficiarioApplication(beneficiarioAdapter);
const beneficiarioController = new BeneficiarioController(beneficiarioApp);

//definición de las rutas

router.post("/", async (req, res)=>{
    try {
        await beneficiarioController.createBeneficiario(req, res);

    } catch (error) {
        res.status(500).json({message: "Error en la creación de beneficiario", error});
    }
});
router.get("/", async(req, res)=>{
    try {
        await beneficiarioController.getAllBeneficiarios(req, res);
    } catch (error) {
        res.status(500).json({message:"Error en la consulta de datos", error});
    }
});
router.get("/:id", async (req, res) => {
    await beneficiarioController.getBeneficiarioById(req, res);
});

// Agregar PUT
router.put("/:id", (req, res) =>
  beneficiarioController.updateBeneficiario(req, res)
);

export default router;