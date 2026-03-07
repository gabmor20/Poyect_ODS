
export interface Incentive {
  id?: number;
  companyId: number;        
  year: number;
  totalDonatedValue: number;
  calculatedIncentive: number;
  appliedCap: boolean;       
  createdAt: Date;
}

export enum FoodClassification {
  PERISHABLE = 'P',
  NON_PERISHABLE = 'N',
  INFANT = 'I'
}