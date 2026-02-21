export interface Entrega {
  IdEntrega?: number;
  IdBeneficiario: number;
  Estado?: 'PENDIENTE' | 'ENVIADO';
  FechaSalida?: Date;
  Lotes?: number[];
}