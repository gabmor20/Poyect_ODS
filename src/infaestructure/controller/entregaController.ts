import { Request, Response } from "express";
import { EntregaAdapter } from "../adapter/EntregaAdapter";
import { EstadoEntrega } from "../entities/Entrega";

const entregaAdapter = new EntregaAdapter();

export class EntregaController {

  // =====================================
  // CREAR ENTREGA
  // =====================================
  static async create(req: Request, res: Response) {
    try {

      const { id_beneficiario, lotes } = req.body;

      if (!id_beneficiario) {
        return res.status(400).json({
          message: "id_beneficiario es obligatorio",
        });
      }

      if (!lotes || !Array.isArray(lotes) || lotes.length === 0) {
        return res.status(400).json({
          message: "Debe enviar al menos un lote",
        });
      }

      const entrega = await entregaAdapter.createWithLotes(
        id_beneficiario,
        lotes
      );

      return res.status(201).json(entrega);

    } catch (error: any) {

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // =====================================
  // ACTUALIZAR ESTADO
  // =====================================
  static async updateEstado(req: Request, res: Response) {
    try {

      const id_entrega = Number(req.params.id);
      const { estado } = req.body;

      if (!Object.values(EstadoEntrega).includes(estado)) {
        return res.status(400).json({
          message: "Estado inválido. Solo PENDIENTE o ENVIADO",
        });
      }

      const entregaActualizada = await entregaAdapter.updateEstado(
        id_entrega,
        estado
      );

      return res.status(200).json(entregaActualizada);

    } catch (error: any) {

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // =====================================
  // OBTENER ENTREGAS POR BENEFICIARIO
  // =====================================
  static async getByBeneficiario(req: Request, res: Response) {
    try {

      const id_beneficiario = Number(req.params.id);

      const entregas = await entregaAdapter.findByBeneficiario(
        id_beneficiario
      );

      return res.status(200).json(entregas);

    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // =====================================
  // OBTENER ENTREGA POR ID
  // =====================================
  static async getById(req: Request, res: Response) {
    try {

      const id_entrega = Number(req.params.id);

      const entrega = await entregaAdapter.findById(id_entrega);

      if (!entrega) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      return res.status(200).json(entrega);

    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}