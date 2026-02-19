import { UserApplication } from "../../application/UserApplication";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserController } from "../controller/UserController";
import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

//inicialización de las capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

//definición de las rutas

router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

router.post("/users", async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error en la creación de usuario", error });
  }
});
router.get("/users", authenticateToken, async (req, res) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error en la consulta de datos", error });
  }
});

router.get("/users/email/:email", authenticateToken, async (req, res) => {
  try {
    await userController.getUserByEmail(req, res);
  } catch (error) {
    res.status(500).json({ message: "ERROR EN LA CONSULTA DE DATOS ", error });
  }
});

export default router;
