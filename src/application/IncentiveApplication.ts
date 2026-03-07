import { IncentiveService } from "../domain/services/IncentiveService";
import { Incentive } from "../domain/Entities/Incentive";


export interface UserRepository {
 
  getUserRole(userId: number): Promise<string | null>;
}

export interface EmpresaRepository {
 
  findByUserId(userId: number): Promise<{ pagoAnualTributario: number } | null>;
}

export interface LoteRepository {
 
  getDonationsGroupedByClassification(userId: number, year: number): Promise<{ amount: number; classification: string }[]>;
}


export class IncentiveApplication {
  constructor(
    private userRepo: UserRepository,
    private empresaRepo: EmpresaRepository,
    private loteRepo: LoteRepository,
    private incentiveService: IncentiveService
  ) {}

  /**
   
   * @param userId 
   * @param year 
   */
  async calculate(userId: number, year: number): Promise<Incentive> {
   
    const role = await this.userRepo.getUserRole(userId);
    
   
    if (!role || role.toLowerCase() !== 'empresa') {
      throw new Error(`Acceso denegado: El beneficio tributario solo está disponible para usuarios con rol 'Empresa'.`);
    }

   
    const empresaData = await this.empresaRepo.findByUserId(userId);
    if (!empresaData) {
      throw new Error("No se encontró el perfil de empresa ni el valor del pago anual tributario para este usuario.");
    }

   
    const donations = await this.loteRepo.getDonationsGroupedByClassification(userId, year);
    if (donations.length === 0) {
      throw new Error(`No se encontraron donaciones registradas en el año ${year} para esta empresa.`);
    }


    let totalDonatedValue = 0;
    let rawIncentiveTotal = 0;

    donations.forEach(d => {
      totalDonatedValue += d.amount;
     
      rawIncentiveTotal += this.incentiveService.calculateRawBenefit(d.amount, d.classification);
    });

  
    const { finalValue, capped } = this.incentiveService.applyTaxCap(
      rawIncentiveTotal, 
      empresaData.pagoAnualTributario
    );

    
    return {
      companyId: userId,
      year,
      totalDonatedValue,
      calculatedIncentive: finalValue,
      appliedCap: capped,
      createdAt: new Date()
    };
  }
}