import { Entidad } from "./Entidad";

export interface EntidadPort {

    createEntidad(user: Omit<Entidad, "id">): Promise<number>;
    updateEntidad(id: number, user: Partial<Entidad>): Promise <boolean>;
    deleteEntidad(id: number): Promise <boolean>;
    getEntidadById(id: number): Promise <Entidad | null>;
    getEntidadByNIT(nit: number): Promise <Entidad | null>;
    getEntidadByEmail(email: string): Promise <Entidad | null>;
    getAllEntidades(): Promise <Entidad[]>;
}