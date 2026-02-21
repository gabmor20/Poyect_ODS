import { AppDataSource } from "..//config/data_base";
import { Entrega, EstadoEntrega } from "../entities/Entrega";
import { Lote } from "../entities/Lote";
import { Incentivo } from "../entities/Incentivo";
import { Repository } from "typeorm";

export class EntregaAdapter {

  private entregaRepo = AppDataSource.getRepository(Entrega);
  private loteRepo = AppDataSource.getRepository(Lote);
private incentivoRepo = AppDataSource.getRepository(Incentivo);

  // =====================================
  // CREAR ENTREGA
  // =====================================

  async create(id_beneficiario: number): Promise<Entrega> {

    const nuevaEntrega = this.entregaRepo.create({
      id_beneficiario,
      // estado y fecha_salida se insertan automáticamente
    });

    return await this.entregaRepo.save(nuevaEntrega);
  }

  // =====================================
  // CREAR ENTREGA CON LOTES (RECOMENDADO)
  // =====================================

  async createWithLotes(
    id_beneficiario: number,
    lotesIds: number[]
  ): Promise<Entrega> {

    return await AppDataSource.transaction(async (manager) => {

      const entrega = manager.create(Entrega, {
        id_beneficiario,
      });

      const entregaGuardada = await manager.save(entrega);
      for (const id of lotesIds) {

        const lote = await manager.findOne(Lote, {
          where: { id_lote: id },
        });

        if (!lote) {
          throw new Error(`Lote ${id} no existe`);
        }

        lote.id_entrega = entregaGuardada.id_entrega;
        await manager.save(lote);
      }

      return entregaGuardada;
    });
  }

  // =====================================
  // ACTUALIZAR ESTADO
  // =====================================

  async updateEstado(
    id_entrega: number,
    nuevoEstado: EstadoEntrega
  ): Promise<Entrega> {

    const entrega = await this.entregaRepo.findOne({
      where: { id_entrega },
      relations: ["lotes"],
    });

    if (!entrega) {
      throw new Error("Entrega no encontrada");
    }

    if (entrega.estado === EstadoEntrega.ENVIADO) {
      throw new Error("La entrega ya fue enviada");
    }

    if (nuevoEstado === EstadoEntrega.ENVIADO) {

      if (!entrega.lotes || entrega.lotes.length === 0) {
        throw new Error("No se puede enviar una entrega sin lotes");
      }

      entrega.estado = EstadoEntrega.ENVIADO;
      entrega.fecha_entrega = new Date();
    }
    // =============================
// CALCULAR INCENTIVO
// =============================

const lotes = entrega.lotes;

const costoTotalEntrega = lotes.reduce(
  (acc, lote) => acc + Number(lote.costo_total),
  0
);

const tieneA = lotes.some(l => l.clasificacion === "A");
const tieneB = lotes.some(l => l.clasificacion === "B");

let limiteHoras = 72;

if (tieneA) {
  limiteHoras = 5;
} else if (tieneB) {
  limiteHoras = 24;
}

const diffHoras =
  (entrega.fecha_entrega.getTime() -
   entrega.fecha_salida.getTime()) / (1000 * 60 * 60);

const atiempo = diffHoras < limiteHoras;

const descuentoSinIva = atiempo
  ? costoTotalEntrega * 0.37
  : 0.0;

// Crear incentivo
const incentivo = this.incentivoRepo.create({
  id_entrega: entrega.id_entrega,
  costo_total_entrega: costoTotalEntrega,
  descuento_sin_iva: descuentoSinIva,
  atiempo: atiempo,
});
    await this.incentivoRepo.save(incentivo);
    return await this.entregaRepo.save(entrega);
  }

  // =====================================
  // OBTENER POR BENEFICIARIO
  // =====================================

  async findByBeneficiario(id_beneficiario: number) {
    return await this.entregaRepo.find({
      where: { id_beneficiario },
      relations: ["lotes"],
    });
  }

  // =====================================
  // OBTENER POR ID
  // =====================================

  async findById(id_entrega: number) {
    return await this.entregaRepo.findOne({
      where: { id_entrega },
      relations: ["lotes", "beneficiario"],
    });
  }

  async findAll() {
  return await this.entregaRepo.find({
    relations: ["beneficiario", "lotes"],
    order: { id_entrega: "DESC" },
  });
}
}

