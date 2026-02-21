import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany } from "typeorm";
import { Lote } from "./Lote";
import { Entrega } from "./Entrega";


@Entity("beneficiarios")
export class Beneficiario {

    @PrimaryGeneratedColumn()
    id_beneficiario!: number;

    @Column({ type: "varchar", length: 50 })
    tipo_identificacion!: string;

    @Column({ type: "bigint", unique: true})
    nroidentificacion!: number;

    @Column({ type: "varchar", length: 255 })
    nombre!: string;

    @Column({ type: "varchar", length: 150, unique: true })
    usuario!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    direccion!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "bigint", nullable: true })
    telefono!: number;

    @OneToMany(() => Lote, (lote) => lote.entidad)
    lotes!: Lote[];

    // =========================
// RELACIÓN CON ENTREGAS
// =========================

@OneToMany(() => Entrega, (entrega) => entrega.beneficiario)
entregas!: Entrega[];

}
