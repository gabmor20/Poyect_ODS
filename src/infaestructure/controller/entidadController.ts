import { EntidadApplication} from "../../application/EntidadApplication";
import { Request, Response } from "express";
import { loadUserData } from "../util/user-validation";
import { Entidad } from "../../domain/Entidad";
import { loadUpdateUserData } from "../util/user-update-validation";
import { loadEntidadData } from "../util/entidad-validation";

export class EntidadController {
  private app: EntidadApplication;

  constructor(application: EntidadApplication) {
    this.app = application;
  }

  async createEntidad(req: Request, res: Response): Promise<Response> {
    try {
      //validar los datos de entrada
      const { nit, razonSocial, usuario, password, tipoEntidad , direccion, email, telefono } = loadEntidadData(req.body);
      // Crear usuario

      const entidad: Omit<Entidad, "id"> = { nit, razonSocial, usuario, password, tipoEntidad, direccion, email, telefono };
      const entidadId = await this.app.createEntidad(entidad);

      return res
        .status(200)
        .json({ message: "Entidad creada con exito", entidadId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al crear a la entidad",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async UpdateEntidad(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const dataLoad = loadUpdateUserData(req.body);
      const updated = await this.app.updateEntidad(id, dataLoad);

      return res
        .status(200)
        .json({ message: "Entidad actualizada con éxito", updated });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al actualizar la entidad",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getAllEntidades(req: Request, res: Response): Promise<Response> {
    try {
      // Obtener todos los usuarios desde la capa de aplicación
      const entidades: Entidad[] = await this.app.getAllEntidades();

      // Retornar los usuarios
      return res.status(200).json({
        message: "Entidades obtenidas con éxito",
        data: entidades,
        total: entidades.length,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al obtener entidades",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
