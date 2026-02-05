import { UserApplication } from "../../application/UserApplication";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserController } from "../controller/userController";
import {Request, Response} from "express";
import { Router } from "express";

const router = Router();

//inicialización de las capas
const userAdapter = new UserAdapter;
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

//definición de las rutas

router.post("/users", async (req, res)=>{
    try {
        await userController.createUser(req, res);

    } catch (error) {
        res.status(500).json({message: "Error en la creación de usuario", error});
    }
});
router.get("/users", async(req, res)=>{
    try {
        await userController.getAllUsers(req, res);
    } catch (error) {
        res.status(500).json({message:"Error en la consulta de datos", error});
    }
})