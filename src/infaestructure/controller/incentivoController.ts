import { Request, Response } from "express";
import { IncentivoApplication } from "../../application/IncentivoApplication";
import { IncentivoAdapter } from "../adapter/IncentivoAdapter";

const incentivoApp = new IncentivoApplication(
  new IncentivoAdapter()
);

export class IncentivoController {

  static async getAll(req: Request, res: Response) {
    try {
      const incentivos = await incentivoApp.getAll();
      return res.status(200).json(incentivos);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const incentivo = await incentivoApp.getById(
        Number(req.params.id)
      );

      if (!incentivo) {
        return res.status(404).json({
          message: "Incentivo no encontrado",
        });
      }

      return res.status(200).json(incentivo);

    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getByEntrega(req: Request, res: Response) {
    try {
      const incentivo = await incentivoApp.getByEntrega(
        Number(req.params.id)
      );

      if (!incentivo) {
        return res.status(404).json({
          message: "Incentivo no encontrado para esta entrega",
        });
      }

      return res.status(200).json(incentivo);

    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}