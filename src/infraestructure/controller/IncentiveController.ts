import { Request, Response } from "express";
import { IncentiveApplication } from "../../application/IncentiveApplication";


export class IncentiveController {
  constructor(private readonly incentiveApp: IncentiveApplication) {}

 
  async calculate(req: Request, res: Response) {
    try {
     
      const userIdStr = req.params.userId as string;
      const yearStr = req.params.year as string;

      const userId = parseInt(userIdStr);
      const year = parseInt(yearStr);

      // Validaciones básicas de entrada
      if (isNaN(userId) || isNaN(year)) {
        return res.status(400).json({ 
          error: "Los parámetros 'userId' y 'year' deben ser números válidos." 
        });
      }

      // Llamada a la capa de aplicación
      const result = await this.incentiveApp.calculate(userId, year);

      // Respuesta exitosa
      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (error: any) {
      // Manejo de errores de negocio (ej: "No hay donaciones", "Rol inválido")
      // Usamos un código 403 o 400 según la lógica de tu aplicación
      return res.status(400).json({
        success: false,
        message: error.message || "Ocurrió un error inesperado en el cálculo."
      });
    }
  }
}