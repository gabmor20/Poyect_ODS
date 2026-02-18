import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("entidades")
export class Entidad {

    @PrimaryGeneratedColumn()
    id_entidad!: number;

    @Column({ type: "bigint", unique: true})
    nit!: number;

    @Column({ type: "varchar", length: 255 })
    razon_social!: string;

    @Column({ type: "varchar", length: 150, unique: true })
    usuario!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({ type: "varchar", length: 50 })
    tipo_entidad!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    direccion!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "bigint", nullable: true })
    telefono!: number;
}
