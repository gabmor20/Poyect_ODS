export interface Lote {
  id: number;
  codigo: string;
  descripcion: string;
  fechaCreacion?: Date;
  entidadId: number; // FK
}
