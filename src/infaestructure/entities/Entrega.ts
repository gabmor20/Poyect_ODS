import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Check,
} from "typeorm";
import { Beneficiario } from "./Beneficiario";
import { Lote } from "./Lote";
import { Incentivo } from "./Incentivo";

export enum EstadoEntrega {
  PENDIENTE = "PENDIENTE",
  ENVIADO = "ENVIADO",
}

@Entity("entregas")
@Check(`"estado" IN ('PENDIENTE', 'ENVIADO')`)
export class Entrega {

  @PrimaryGeneratedColumn({ type: "int" })
  id_entrega!: number;

  // =========================
  // FK BENEFICIARIO
  // =========================

  @Column({ type: "int" })
  id_beneficiario!: number;

  @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.entregas, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_beneficiario" })
  beneficiario!: Beneficiario;

  // =========================
  // CAMPOS DE NEGOCIO
  // =========================

  @Column({
    type: "enum",
    enum: EstadoEntrega,
    default: EstadoEntrega.PENDIENTE,
  })
  estado!: EstadoEntrega;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_salida!: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  fecha_entrega!: Date;

  // =========================
  // RELACIÓN CON LOTES
  // =========================

  @OneToMany(() => Lote, (lote) => lote.entrega)
  lotes!: Lote[];

  // =========================
  // RELACIÓN CON INCENTIVOS
  // =========================

  @OneToMany(() => Incentivo, (incentivo) => incentivo.entrega)
  incentivos!: Incentivo[];
}
