import { FoodClassification } from "../Entities/Incentive";

/**
 * src/domain/services/IncentiveService.ts
 * Contiene la lógica matemática pura.
 */
export class IncentiveService {
  private readonly factors: Record<string, number> = {
    [FoodClassification.PERISHABLE]: 0.25,
    [FoodClassification.NON_PERISHABLE]: 0.15,
    [FoodClassification.INFANT]: 0.30,
  };

  /**
   * Calcula el beneficio bruto para un monto y clasificación individual.
   * Este nombre DEBE coincidir con el que llama IncentiveApplication.
   */
  calculateRawBenefit(amount: number, classification: string): number {
    const factor = this.factors[classification] || 0.10;
    return amount * factor;
  }

  /**
   * Aplica la restricción del 25% del impuesto anual.
   * Este nombre DEBE coincidir con el que llama IncentiveApplication.
   */
  applyTaxCap(calculatedIncentive: number, annualTaxAmount: number): { finalValue: number; capped: boolean } {
    const maxAllowed = annualTaxAmount * 0.25;

    if (calculatedIncentive > maxAllowed) {
      return { finalValue: maxAllowed, capped: true };
    }

    return { finalValue: calculatedIncentive, capped: false };
  }
}