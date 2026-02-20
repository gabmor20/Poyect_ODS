import { Request, Response } from "express";
import { LoteApplication } from "../../application/LoteApplication";
import { loadLoteData } from "../util/lote-validation";
import { loadUpdateLoteData } from "../util/lote-update-validation";


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

async getAllLotes(req: Request, res: Response) {
  try {
    const lotes = await this.app.getAllLotes();
    return res.status(200).json(lotes);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener lotes",
      details: error instanceof Error ? error.message : error
    });
  }
}

async getLoteById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const lote = await this.app.getLoteById(id);

    if (!lote) {
      return res.status(404).json({ error: "Lote no encontrado" });
    }
    return res.status(200).json(lote);

  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener lote",
      details: error instanceof Error ? error.message : error
    });
  }
}

async updateLote(req: Request, res: Response) {
  try {

    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const payload = loadUpdateLoteData(req.body);
    const updated = await this.app.updateLote(id, payload);
    if (!updated) {
      return res.status(404).json({ error: "Lote no encontrado" });
    }
    return res.json({
      message: "Lote actualizado correctamente"
    });

  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : error
    });
  }
}

}
