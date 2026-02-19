import { Entidad } from "../domain/Entidad";
import { EntidadPort } from "../domain/EntidadPort";
import { User } from "../domain/User";


export class EntidadApplication {

    private port: EntidadPort;

    constructor(port: EntidadPort){
        this.port = port;
    }

    async createEntidad(entidad: Omit<Entidad, "id">): Promise<number>{
        //Antes de crear una entidad debo validar que el mail no exista
        const existEmail = await this.port.getEntidadByEmail(entidad.email);
        const existNIT = await this.port.getEntidadByNIT(entidad.nit);
        if(existNIT){
            throw new Error("Este NIT ya está registrado");
        }
        if(existEmail){
            throw new Error("Este email ya está registrado");
        }
        return this.port.createEntidad(entidad);
    }

    async getEntidadById(id: number): Promise<Entidad | null>{
        return await this.port.getEntidadById(id);
    }

    async getEntidadByEmail(email: string): Promise<Entidad | null>{
        return await this.port.getEntidadByEmail(email);
    }

    async getAllEntidades(): Promise<Entidad[]>{
        return await this.port.getAllEntidades();
    }

    async updateEntidad(id: number, entidad: Partial<Entidad>): Promise<boolean>{

        const existingEntidad = await this.port.getEntidadById(id);
        //log the existing entity for debugging
        //console.log("APP UPDATE RECIBE:", entidad);

        if (!entidad) {
        throw new Error("Payload undefined en Application");
        }
        //
        if(!existingEntidad){
            throw new Error("Entidad no encontrada");
        }
        if(entidad.email){
            
            const emailTaken = await this.port.getEntidadByEmail(entidad.email);
            
            if(emailTaken && emailTaken.id !== id){
                throw  new Error("El email ya está en uso");
            }
        }
         if(entidad.nit){
            
            const nitTaken = await this.port.getEntidadByNIT(entidad.nit);
            
            if(nitTaken && nitTaken.id !== id){
                throw  new Error("El NIT ya está en uso");
            }
        }
        return this.port.updateEntidad(id, entidad);

    }

    async deleteEntidad(id:number): Promise<boolean>{
        return await this.port.deleteEntidad(id);
    }
}