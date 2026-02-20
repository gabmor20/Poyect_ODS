import { Lote } from "../domain/Lote";
import { LotePort } from "../domain/LotePort";
import { EntidadPort } from "../domain/EntidadPort";
import { ReturnLoteData } from "../infaestructure/util/lote-validation";
import { UpdateLoteData } from "../infaestructure/util/lote-update-validation";

export class LoteApplication {

  constructor(
    private lotePort: LotePort,
    private entidadPort: EntidadPort
  ) {}

  async createLote(data: ReturnLoteData): Promise<number> {

    // ✅ Validar que la entidad exista
    const entidad = await this.entidadPort.getEntidadById(data.entidadId);

    if (!entidad) {
      throw new Error("Entidad no encontrada");
    }

    return this.lotePort.createLote({
      codigo: data.codigo,
      clasificacion: data.clasificacion,
      cantidad: data.cantidad,
      fechaVencimiento: data.fechaVencimiento,
      entidadId: data.entidadId,
      costoTotal: data.costoTotal,
      estado: "Registrado" //  Forzado por backend
    });
  }

  async getLoteById(id: number) {
    return this.lotePort.getLoteById(id);
  }

  async getAllLotes() {
    return this.lotePort.getAllLotes();
  }

  async updateLote(id: number, data: UpdateLoteData): Promise<boolean> {

  const existing = await this.lotePort.getLoteById(id);

  if (!existing) {
    throw new Error("Lote no encontrado");
  }
  //  Regla de transición de estado
  if (data.estado) {

    if (existing.estado !== "Registrado") {
      throw new Error("El lote ya fue procesado y no puede cambiar de estado");
    }

  }
  return this.lotePort.updateLote(id, data);
}

  async deleteLote(id: number) {
    return this.lotePort.deleteLote(id);
  }
}
