import { EntidadApplication } from "../../application/EntidadApplication";
import { EntidadAdapter } from "../adapter/EntidadAdapter";
import { AppDataSource } from "../config/data_base";
import { EntidadController } from "../controller/EntidadController";
import {Request, Response} from "express";
import { Router } from "express";

const router = Router();

//inicialización de las capas
const entidadAdapter = new EntidadAdapter(AppDataSource);
const entidadApp = new EntidadApplication(entidadAdapter);
const entidadController = new EntidadController(entidadApp);

//definición de las rutas

router.post("/", async (req, res)=>{
    try {
        await entidadController.createEntidad(req, res);

    } catch (error) {
        res.status(500).json({message: "Error en la creación de entidad", error});
    }
});
router.get("/", async(req, res)=>{
    try {
        await entidadController.getAllEntidades(req, res);
    } catch (error) {
        res.status(500).json({message:"Error en la consulta de datos", error});
    }
})
export default router;