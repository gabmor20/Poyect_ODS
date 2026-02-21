import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Entrega } from "./Entrega";

@Entity("incentivos")
export class Incentivo {

  @PrimaryGeneratedColumn()
  id_incentivo!: number;

  @Column({type: "int"})
  id_entrega!: number;

  @OneToOne(() => Entrega)
  @JoinColumn({ name: "id_entrega" })
  entrega!: Entrega;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  costo_total_entrega!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  descuento_sin_iva!: number;

  @Column({ type: "boolean" })
  atiempo!: boolean;
}