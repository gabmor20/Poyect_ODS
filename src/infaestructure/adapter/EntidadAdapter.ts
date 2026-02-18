import { DataSource, Repository } from "typeorm";
import { Entidad as EntidadDomain } from "../../domain/Entidad";
import { Entidad as EntidadEntity} from "../entities/Entidad";
import { EntidadPort } from "../../domain/EntidadPort";
import { AppDataSource } from "../config/data_base";

export class EntidadAdapter implements EntidadPort {
    //private entidadRepository:Repository<EntidadEntity>;  

    constructor(private dataSource: DataSource) {}
     
    async createEntidad(user: Omit<EntidadDomain, "id">): Promise<number> {
        const repo = this.dataSource.getRepository(EntidadEntity);

        const entity = repo.create({
            nit: user.nit,
            razon_social: user.razonSocial,
            usuario: user.usuario,
            password: user.password,
            tipo_entidad: user.tipoEntidad,
            direccion: user.direccion,
            email: user.email,
            telefono: user.telefono
        });

        const saved = await repo.save(entity);
        return saved.id_entidad;
    }

    private mapToDomain(entity: EntidadEntity): EntidadDomain {
        return {
            id: entity.id_entidad,
            nit: Number(entity.nit),
            razonSocial: entity.razon_social,
            usuario: entity.usuario,
            password: entity.password,
            tipoEntidad: entity.tipo_entidad,
            direccion: entity.direccion,
            email: entity.email,
            telefono: Number(entity.telefono)
        } as EntidadDomain;
    }
    updateEntidad(id: number, user: Partial<EntidadDomain>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteEntidad(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getEntidadById(id: number): Promise<EntidadDomain | null> {
        throw new Error("Method not implemented.");
    }
    async getEntidadByNIT(nit: number): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const entidad = await repo.findOne({
        where: { nit }
    });

    if (!entidad) return null;

    return this.mapToDomain(entidad);
}
    async getEntidadByEmail(email: string): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const entidad = await repo.findOne({
        where: { email }
    });

    if (!entidad) return null;

    return this.mapToDomain(entidad);
}
    
    async getAllEntidades(): Promise<EntidadDomain[]> {
    const repo = this.dataSource.getRepository(EntidadEntity);
    const entidades = await repo.find();
    return entidades.map(e => this.mapToDomain(e));
}
    
}
