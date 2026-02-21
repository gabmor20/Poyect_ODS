import { Entrega } from "./Entrega";

export interface EntregaPort {
  create(data: any): Promise<any>;
  updateEstado(id: number, estado: string): Promise<any>;
  findByBeneficiario(idBeneficiario: number): Promise<any[]>;
}