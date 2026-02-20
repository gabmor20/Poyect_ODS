import { DataSource, Repository } from "typeorm";
import { LotePort } from "../../domain/LotePort";
import { Lote as LoteDomain } from "../../domain/Lote";
import { Lote as LoteEntity } from "../entities/Lote";
import { Entidad } from "../entities/Entidad";

export class LoteAdapter implements LotePort {

  private repo: Repository<LoteEntity>;
  private entidadRepo: Repository<Entidad>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(LoteEntity);
    this.entidadRepo = this.dataSource.getRepository(Entidad);
  }

  // ✅ CREATE
  async createLote(lote: Omit<LoteDomain, "id">): Promise<number> {

    // Validar que entidad exista
    const entidad = await this.entidadRepo.findOne({
      where: { id_entidad: lote.entidadId }
    });

    if (!entidad) {
      throw new Error("Entidad no encontrada");
    }

    const newLote = this.repo.create({
      codigo: lote.codigo,
      cantidad: lote.cantidad,
      clasificacion: lote.clasificacion,
      fecha_vencimiento: lote.fechaVencimiento,
      costo_total: lote.costoTotal,
      estado: lote.estado,
      entidad: entidad
    });

    const saved = await this.repo.save(newLote);
    return saved.id_lote;
  }

  // ✅ GET BY ID
  async getLoteById(id: number): Promise<LoteDomain | null> {

    const lote = await this.repo.findOne({
      where: { id_lote: id },
      relations: ["entidad"]
    });

    if (!lote) return null;

    return {
      id: lote.id_lote,
      codigo: lote.codigo,
      cantidad: lote.cantidad,
      clasificacion: lote.clasificacion,
      fechaCreacion: lote.fecha_creacion,
      fechaVencimiento: lote.fecha_vencimiento,
      costoTotal: lote.costo_total,
      estado: lote.estado as "Registrado" | "Rechazado" | "Aceptado",
      entidadId: lote.entidad.id_entidad
    };
  }

  // ✅ GET ALL
  async getAllLotes(): Promise<LoteDomain[]> {

    const lotes = await this.repo.find({
      relations: ["entidad"]
    });

    return lotes.map(l => ({
      id: l.id_lote,
      codigo: l.codigo,
      cantidad: l.cantidad,
      clasificacion: l.clasificacion,
      fechaCreacion: l.fecha_creacion,
      fechaVencimiento: l.fecha_vencimiento,
      costoTotal: l.costo_total,
      estado: l.estado as "Registrado" |"Rechazado" | "Aceptado",
      entidadId: l.entidad.id_entidad
    }));
  }

  // ✅ UPDATE (solo campos permitidos)
  async updateLote(
  id: number,
  lote: Partial<Pick<LoteDomain,
    "cantidad" |
    "clasificacion" |
    "fechaVencimiento" |
    "costoTotal" |
    "estado"
  >>
): Promise<boolean> {

  const existing = await this.repo.findOne({
    where: { id_lote: id }
  });

  if (!existing) return false;
  if (lote.cantidad !== undefined)
    existing.cantidad = lote.cantidad;
  if (lote.clasificacion !== undefined)
    existing.clasificacion = lote.clasificacion;
  if (lote.fechaVencimiento !== undefined)
    existing.fecha_vencimiento = lote.fechaVencimiento;
  if (lote.costoTotal !== undefined)
    existing.costo_total = lote.costoTotal;
  if (lote.estado !== undefined)
    existing.estado = lote.estado;
  await this.repo.save(existing);

  return true;
}

  // ✅ DELETE
  async deleteLote(id: number): Promise<boolean> {

    const result = await this.repo.delete({ id_lote: id });

    return result.affected !== 0;
  }
}

