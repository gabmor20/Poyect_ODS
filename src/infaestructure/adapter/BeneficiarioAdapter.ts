import { DataSource, Repository } from "typeorm";
import { Beneficiario as EntidadDomain } from "../../domain/Beneficiario";
import { Beneficiario, Beneficiario as EntidadEntity} from "../entities/Beneficiario";
import { BeneficiarioPort } from "../../domain/BeneficiarioPort";
import { AppDataSource } from "../config/data_base";

export class BeneficiarioAdapter implements BeneficiarioPort {
    //private entidadRepository:Repository<EntidadEntity>;  

    constructor(private dataSource: DataSource) {}
     
    async createBeneficiario(user: Omit<EntidadDomain, "id">): Promise<number> {
        const repo = this.dataSource.getRepository(EntidadEntity);

        const entity = repo.create({
            nroidentificacion: user.nroidentificacion,
            tipo_identificacion: user.tipoIdentificacion,
            nombre: user.nombre,
            usuario: user.usuario,
            password: user.password,
            direccion: user.direccion,
            email: user.email,
            telefono: user.telefono
        });

        const saved = await repo.save(entity);
        return saved.id_beneficiario;
    }

    private mapToDomain(entity: EntidadEntity): EntidadDomain {
        return {
            id: entity.id_beneficiario,
            tipoIdentificacion: entity.tipo_identificacion,
            nroidentificacion: Number(entity.nroidentificacion),
            nombre: entity.nombre,
            usuario: entity.usuario,
            password: entity.password,
            direccion: entity.direccion,
            email: entity.email,
            telefono: Number(entity.telefono)
        };
    }

async updateBeneficiario(id: number, user: Partial<EntidadDomain>): Promise<boolean> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const existing = await repo.findOne({
        where: { id_beneficiario: id }
    });

    if (!existing) return false;

    // Mapear manualmente campos
    if (user.tipoIdentificacion !== undefined) existing.tipo_identificacion = user.tipoIdentificacion;
    if (user.nroidentificacion !== undefined) existing.nroidentificacion = user.nroidentificacion;
    if (user.nombre !== undefined) existing.nombre = user.nombre;
    if (user.usuario !== undefined) existing.usuario = user.usuario;
    if (user.password !== undefined) existing.password = user.password;
    if (user.direccion !== undefined) existing.direccion = user.direccion;
    if (user.email !== undefined) existing.email = user.email;
    if (user.telefono !== undefined) existing.telefono = user.telefono;

    await repo.save(existing);

    return true;
}

    async deleteBeneficiario(id: number): Promise<boolean> {
        const repo = this.dataSource.getRepository(EntidadEntity);
        const result = await repo.delete({ id_beneficiario: id });
        return result.affected !== 0;
    }

    async getBeneficiarioById(id: number): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);
    const entidad = await repo.findOne({
        where: { id_beneficiario: id }
    });
    if (!entidad) return null;
    return this.mapToDomain(entidad);
}

    async getBeneficiarioByNIT(nroid: number): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const beneficiario = await repo.findOne({
        where: { nroidentificacion: nroid }
    });

    if (!beneficiario) return null;
    return this.mapToDomain(beneficiario);
}
    async getBeneficiarioByEmail(email: string): Promise<EntidadDomain | null> {
    const repo = this.dataSource.getRepository(EntidadEntity);

    const entidad = await repo.findOne({
        where: { email }
    });

    if (!entidad) return null;

    return this.mapToDomain(entidad);
}
    
    async getAllBeneficiarios(): Promise<EntidadDomain[]> {
    const repo = this.dataSource.getRepository(EntidadEntity);
    const entidades = await repo.find();
    return entidades.map(e => this.mapToDomain(e));
}
    
}
