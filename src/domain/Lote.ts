export interface Lote {
  id: number;
  codigo: string;
  cantidad: number;
  clasificacion: string;
  fechaCreacion?: Date;
  fechaVencimiento: Date;
  entidadId: number; // FK
  costoTotal: number;
  estado: "Registrado" |"Rechazado" | "Aceptado";
}
