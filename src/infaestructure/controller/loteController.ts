import { Request, Response } from "express";
import { LoteApplication } from "../../application/LoteApplication";
import { loadLoteData } from "../util/lote-validation";


export class LoteController {

  constructor(private app: LoteApplication) {}

async createLote(req: Request, res: Response) {
  try {

    const payload = loadLoteData(req.body);

    const loteId = await this.app.createLote(payload);

    return res.status(201).json({
      message: "Lote creado con éxito",
      loteId
    });

  } catch (error) {
    return res.status(400).json({
      error: "Error al crear lote",
      details: error instanceof Error ? error.message : error
    });
  }
}
}
