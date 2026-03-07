import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("empresa")
export class Empresa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  nit!: string;

  @Column({ type: "varchar", length: 255 })
  razonSocial!: string;

  @Column({ type: "varchar", length: 255 })
  tipoEntidad!: string;

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  pagoAnualTributario!: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "int" })
  user_id!: number;
}
