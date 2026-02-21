import { Beneficiario } from "./Beneficiario";

export interface BeneficiarioPort {

    createBeneficiario(user: Omit<Beneficiario, "id">): Promise<number>;
    updateBeneficiario(id: number, user: Partial<Beneficiario>): Promise <boolean>;
    deleteBeneficiario(id: number): Promise <boolean>;
    getBeneficiarioById(id: number): Promise <Beneficiario | null>;
    getBeneficiarioByNIT(nit: number): Promise <Beneficiario | null>;
    getBeneficiarioByEmail(email: string): Promise <Beneficiario | null>;
    getAllBeneficiarios(): Promise <Beneficiario[]>;
}