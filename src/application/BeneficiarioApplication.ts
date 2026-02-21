import { Beneficiario } from "../domain/Beneficiario";
import { BeneficiarioPort } from "../domain/BeneficiarioPort";
import { User } from "../domain/User";



export class BeneficiarioApplication {

    private port: BeneficiarioPort;

    constructor(port: BeneficiarioPort){
        this.port = port;
    }

    async createBeneficiario(beneficiario: Omit<Beneficiario, "id">): Promise<number>{
        //Antes de crear una entidad debo validar que el mail no exista
        const existEmail = await this.port.getBeneficiarioByEmail(beneficiario.email);
        const existNroid = await this.port.getBeneficiarioByNIT(beneficiario.nroidentificacion);
        if(existNroid){
            throw new Error("Este Nroidentificación ya está registrado");
        }
        if(existEmail){
            throw new Error("Este email ya está registrado");
        }
        return this.port.createBeneficiario(beneficiario);
    }

    async getBeneficiarioById(id: number): Promise<Beneficiario | null>{
        return await this.port.getBeneficiarioById(id);
    }

    async getBeneficiarioByEmail(email: string): Promise<Beneficiario | null>{
        return await this.port.getBeneficiarioByEmail(email);
    }

    async getAllBeneficiarios(): Promise<Beneficiario[]>{
        return await this.port.getAllBeneficiarios();
    }

    async updateBeneficiario(id: number, beneficiario: Partial<Beneficiario>): Promise<boolean>{

        const existingBeneficiario = await this.port.getBeneficiarioById(id);
        //log the existing entity for debugging
        //console.log("APP UPDATE RECIBE:", beneficiario);

        if (!beneficiario) {
        throw new Error("Payload undefined en Application");
        }
        //
        if(!existingBeneficiario){
            throw new Error("Beneficiario no encontrado");
        }
        if(beneficiario.email){
            
            const emailTaken = await this.port.getBeneficiarioByEmail(beneficiario.email);
            
            if(emailTaken && emailTaken.id !== id){
                throw  new Error("El email ya está en uso");
            }
        }
         if(beneficiario.nroidentificacion){
            
            const nroidTaken = await this.port.getBeneficiarioByNIT(beneficiario.nroidentificacion);
            
            if(nroidTaken && nroidTaken.id !== id){
                throw  new Error("El NRO IDENTIFICACION ya está en uso");
            }
        }
        return this.port.updateBeneficiario(id, beneficiario);

    }

    async deleteBeneficiario(id:number): Promise<boolean>{
        return await this.port.deleteBeneficiario(id);
    }
}