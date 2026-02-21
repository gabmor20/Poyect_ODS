import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Entidad } from "./Entidad";
import { Entrega } from "./Entrega";

@Entity("lotes")
export class Lote {

  @PrimaryGeneratedColumn({ type: "int" })
  id_lote!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  codigo!: string;

  @Column({ type: "int" })
  cantidad!: number;

  @Column({ type: "varchar", length: 1 })
  clasificacion!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @Column({ type: "date" })
  fecha_vencimiento!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costo_total!: number;

  @Column({ type: "varchar", length: 20, default: "Registrado" })
  estado!: string;

  // 👇 CLAVE FORÁNEA EXPLÍCITA
  @Column({ type: "int" })
  id_entidad!: number;

  @ManyToOne(() => Entidad, (entidad) => entidad.lotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_entidad" })
  entidad!: Entidad;

    // =========================
  // RELACIÓN CON ENTREGA
  // =========================

  @Column({ type: "int", nullable: true })
  id_entrega!: number;

  @ManyToOne(() => Entrega, (entrega) => entrega.lotes, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "id_entrega" })
  entrega!: Entrega;
}

