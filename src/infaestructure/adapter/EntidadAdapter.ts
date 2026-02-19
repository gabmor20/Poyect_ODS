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
    /*
    async updateEntidad(id: number, user: Partial<EntidadDomain>): Promise<boolean> {
        const repo = this.dataSource.getRepository(EntidadEntity);
        const result = await repo.update({ id_entidad: id }, user);
        return result.affected !== 0;
    }*/
async updateEntidad(id: number, user: Partial<EntidadDomain>): Promise<boolean> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const existing = await repo.findOne({
        where: { id_entidad: id }
    });

    if (!existing) return false;

    // Mapear manualmente campos
    if (user.nit !== undefined) existing.nit = user.nit;
    if (user.razonSocial !== undefined) existing.razon_social = user.razonSocial;
    if (user.usuario !== undefined) existing.usuario = user.usuario;
    if (user.password !== undefined) existing.password = user.password;
    if (user.tipoEntidad !== undefined) existing.tipo_entidad = user.tipoEntidad;
    if (user.direccion !== undefined) existing.direccion = user.direccion;
    if (user.email !== undefined) existing.email = user.email;
    if (user.telefono !== undefined) existing.telefono = user.telefono;

    await repo.save(existing);

    return true;
}


    async deleteEntidad(id: number): Promise<boolean> {
        const repo = this.dataSource.getRepository(EntidadEntity);
        const result = await repo.delete({ id_entidad: id });
        return result.affected !== 0;
    }

    async getEntidadById(id: number): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);
    const entidad = await repo.findOne({
        where: { id_entidad: id }
    });
    if (!entidad) return null;
    return this.mapToDomain(entidad);
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
