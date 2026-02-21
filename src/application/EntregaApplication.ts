import { EntregaAdapter } from "../infaestructure/adapter/EntregaAdapter";
import { EstadoEntrega } from "..//infaestructure/entities/Entrega";

export class EntregaApplication {

  constructor(
    private readonly entregaAdapter: EntregaAdapter
  ) {}

  // =====================================
  // CREAR ENTREGA CON LOTES
  // =====================================

  async create(data: {
    id_beneficiario: number;
    lotes: number[];
  }) {

    const { id_beneficiario, lotes } = data;

    if (!id_beneficiario) {
      throw new Error("id_beneficiario es obligatorio");
    }

    if (!lotes || !Array.isArray(lotes) || lotes.length === 0) {
      throw new Error("Una entrega debe tener al menos un lote");
    }

    return await this.entregaAdapter.createWithLotes(
      id_beneficiario,
      lotes
    );
  }

  // =====================================
  // ACTUALIZAR ESTADO
  // =====================================

  async updateEstado(
    id_entrega: number,
    estado: EstadoEntrega
  ) {

    if (!Object.values(EstadoEntrega).includes(estado)) {
      throw new Error("Estado inválido");
    }

    return await this.entregaAdapter.updateEstado(
      id_entrega,
      estado
    );
  }

  // =====================================
  // OBTENER POR BENEFICIARIO
  // =====================================

  async findByBeneficiario(id_beneficiario: number) {

    if (!id_beneficiario) {
      throw new Error("id_beneficiario es obligatorio");
    }

    return await this.entregaAdapter.findByBeneficiario(
      id_beneficiario
    );
  }

  // =====================================
  // OBTENER POR ID
  // =====================================

  async findById(id_entrega: number) {

    if (!id_entrega) {
      throw new Error("id_entrega es obligatorio");
    }

    return await this.entregaAdapter.findById(id_entrega);
  }
}