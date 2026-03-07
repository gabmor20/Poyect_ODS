import { Incentive } from "../../domain/Entities/Incentive";

export interface IIncentiveApplication {
  calculate(userId: number, year: number): Promise<Incentive>;
}



export interface UserRepository {

  getUserRole(userId: number): Promise<string | null>;
}

export interface EmpresaRepository {
 
  findByUserId(userId: number): Promise<{ pagoAnualTributario: number } | null>;
}

export interface LoteRepository {
  
  getDonationsGroupedByClassification(userId: number, year: number): Promise<{ amount: number; classification: string }[]>;
}