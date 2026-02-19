import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Entidad } from "./Entidad";

@Entity("lotes")
export class Lote {

  @PrimaryGeneratedColumn({ type: "int" })
  id_lote!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  codigo!: string;

  @Column({ type: "varchar", length: 500 })
  descripcion!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  // 👇 CLAVE FORÁNEA EXPLÍCITA
  @Column({ type: "int" })
  id_entidad!: number;

  @ManyToOne(() => Entidad, (entidad) => entidad.lotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_entidad" })
  entidad!: Entidad;
}

