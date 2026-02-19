import { Lote } from "./Lote";

export interface LotePort {
  createLote(lote: Omit<Lote, "id">): Promise<number>;
  getLoteById(id: number): Promise<Lote | null>;
  getAllLotes(): Promise<Lote[]>;
  updateLote(id: number, lote: Partial<Lote>): Promise<boolean>;
  deleteLote(id: number): Promise<boolean>;
}
