import { Lote } from "../domain/Lote";
import { LotePort } from "../domain/LotePort";
import { EntidadPort } from "../domain/EntidadPort";
import { ReturnLoteData } from "../infaestructure/util/lote-validation";

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
      descripcion: data.descripcion,
      entidadId: data.entidadId
    });
  }

  async getLoteById(id: number) {
    return this.lotePort.getLoteById(id);
  }

  async getAllLotes() {
    return this.lotePort.getAllLotes();
  }

  async updateLote(id: number, lote: Partial<Lote>) {
    return this.lotePort.updateLote(id, lote);
  }

  async deleteLote(id: number) {
    return this.lotePort.deleteLote(id);
  }
}
