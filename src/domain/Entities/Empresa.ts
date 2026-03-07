import { User } from "./User";


export interface Empresa {
  id?: number;
  nit: string;
  razonSocial: string;
  tipoEntidad: string;
  pagoAnualTributario: number;
  user_id: number;
  user?: User;
}