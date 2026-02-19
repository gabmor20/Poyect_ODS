import { UserApplication } from "../../application/UserApplication";
import { Request, Response } from "express";
import { loadUserData } from "../util/user-validation";
import { User } from "../../domain/User";
import { loadUpdateUserData } from "../util/user-update-validation";
import { count } from "node:console";

export class UserController {
  private app: UserApplication;

  constructor(application: UserApplication) {
    this.app = application;
  }

  async login(req: Request, res: Response): Promise<string | Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email y contraseña requeridos",
        });
      }

      const token = await this.app.login(email, password);

      return res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      //validar los datos de entrada
      const { name, email, password, status } = loadUserData(req.body);
      // Crear usuario

      const user: Omit<User, "id"> = { name, email, password, status };
      const userId = await this.app.createUser(user);

      return res
        .status(201)
        .json({ message: "Usuario creado con exito", userId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al crear al usuario",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async UpdateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const dataLoad = loadUpdateUserData(req.body);
      const updated = await this.app.updateUser(id, dataLoad);

      return res
        .status(201)
        .json({ message: "Usuario actualizado con éxito", updated });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al actualizar el usuario",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.params.email as string; // 👈 casteo explícito

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await this.app.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        message: "Usuario obtenido con éxito",
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      // Obtener todos los usuarios desde la capa de aplicación
      const users: User[] = await this.app.getAllUsers();

      // Retornar los usuarios
      return res.status(201).json({
        message: "Usuarios obtenidos con éxito",
        data: users,
        total: users.length,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al obtener usuarios",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
