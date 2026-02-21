import { BeneficiarioApplication} from "../../application/BeneficiarioApplication";
import { Request, Response } from "express";
import { Beneficiario } from "../../domain/Beneficiario";
import { loadUpdateBeneficiarioData } from "../util/beneficiario-update-validation";
import { loadBeneficiarioData } from "../util/beneficiario-validation";


export class BeneficiarioController {
  private app: BeneficiarioApplication;

  constructor(application: BeneficiarioApplication) {
    this.app = application;
  }
  
  async createBeneficiario(req: Request, res: Response): Promise<Response> {
    try {
      //validar los datos de entrada
      const { tipoIdentificacion, nroidentificacion, nombre, usuario, password, direccion, email, telefono } = loadBeneficiarioData(req.body);

      const beneficiario: Omit<Beneficiario, "id"> = { tipoIdentificacion, nroidentificacion, nombre, usuario, password, direccion, email, telefono };
      const beneficiarioId = await this.app.createBeneficiario(beneficiario);

      return res
        .status(200)
        .json({ message: "Beneficiario creado con exito", beneficiarioId });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al crear al beneficiario",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  
async updateBeneficiario(req: Request, res: Response): Promise<Response> {
  try {
    // Log del body recibido para depuración
    //console.log("BODY RECIBIDO:", req.body);

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const payload = loadUpdateBeneficiarioData(req.body);
    // Log del payload validado para depuración
    //console.log("PAYLOAD VALIDADO:", payload);

    const updated = await this.app.updateBeneficiario(id, payload);

    return res.status(200).json({
      message: "Beneficiario actualizado con éxito",
      updated
    });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: "Error al actualizar la entidad",
        details: error.message
      });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}


  
  async getAllBeneficiarios(req: Request, res: Response): Promise<Response> {
    try {
      // Obtener todos los usuarios desde la capa de aplicación
      const beneficiarios: Beneficiario[] = await this.app.getAllBeneficiarios();

      // Retornar los usuarios
      return res.status(200).json({
        message: "Beneficiarios obtenidos con éxito",
        data: beneficiarios,
        total: beneficiarios.length,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Error interno del servidor al obtener beneficiarios",
          details: error.message,
        });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  
  
  async getBeneficiarioById(req: Request, res: Response): Promise<Response> {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }
        const entidad = await this.app.getBeneficiarioById(id);

        if (!entidad) {
            return res.status(404).json({ error: "Beneficiario no encontrado" });
        }

        return res.status(200).json({
            message: "Beneficiario obtenido con éxito",
            data: entidad
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                error: "Error interno del servidor al obtener beneficiario",
                details: error.message,
            });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

}
