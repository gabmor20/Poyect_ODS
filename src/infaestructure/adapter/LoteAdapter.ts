import { DataSource } from "typeorm";
import { Lote as LoteDomain } from "../../domain/Lote";
import { Lote as LoteEntity } from "../entities/Lote";
import { Entidad } from "../entities/Entidad";
import { LotePort } from "../../domain/LotePort";

export class LoteAdapter implements LotePort {

  constructor(private dataSource: DataSource) {}

  async createLote(lote: Omit<LoteDomain, "id">): Promise<number> {
    const repo = this.dataSource.getRepository(LoteEntity);
    const entidadRepo = this.dataSource.getRepository(Entidad);

    const entidad = await entidadRepo.findOne({
      where: { id_entidad: lote.entidadId }
    });

    if (!entidad) {
      throw new Error("Entidad no encontrada");
    }

    const newLote = repo.create({
      codigo: lote.codigo,
      descripcion: lote.descripcion,
      //fecha_creacion: lote.fechaCreacion, fecha de creación se maneja automáticamente con default
      entidad: entidad
    });

    const saved = await repo.save(newLote);
    return saved.id_lote;
  }

  async getLoteById(id: number): Promise<LoteDomain | null> {
    const repo = this.dataSource.getRepository(LoteEntity);

    const lote = await repo.findOne({
      where: { id_lote: id },
      relations: ["entidad"]
    });

    if (!lote) return null;

    return {
      id: lote.id_lote,
      codigo: lote.codigo,
      descripcion: lote.descripcion,
      fechaCreacion: lote.fecha_creacion,
      entidadId: lote.entidad.id_entidad
    };
  }

  async getAllLotes(): Promise<LoteDomain[]> {
    const repo = this.dataSource.getRepository(LoteEntity);

    const lotes = await repo.find({ relations: ["entidad"] });

    return lotes.map(l => ({
      id: l.id_lote,
      codigo: l.codigo,
      descripcion: l.descripcion,
      fechaCreacion: l.fecha_creacion,
      entidadId: l.entidad.id_entidad
    }));
  }

  async updateLote(id: number, lote: Partial<LoteDomain>): Promise<boolean> {
    const repo = this.dataSource.getRepository(LoteEntity);

    const existing = await repo.findOne({
      where: { id_lote: id },
      relations: ["entidad"]
    });

    if (!existing) return false;

    if (lote.codigo !== undefined) existing.codigo = lote.codigo;
    if (lote.descripcion !== undefined) existing.descripcion = lote.descripcion;

    await repo.save(existing);
    return true;
  }

  async deleteLote(id: number): Promise<boolean> {
    const repo = this.dataSource.getRepository(LoteEntity);
    const result = await repo.delete({ id_lote: id });
    return result.affected !== 0;
  }
}
