import joi from "joi";

export type UpdateLoteData = {
  cantidad?: number;
  clasificacion?: string;
  fechaVencimiento?: Date;
  costoTotal?: number;
  estado?: "Aceptado" | "Rechazado";
};

export const loadUpdateLoteData = (data: any): UpdateLoteData => {

  const schema = joi.object({
    cantidad: joi.number().positive().optional(),
    clasificacion: joi.string().length(1).optional(),
    fechaVencimiento: joi.date().optional(),
    costoTotal: joi.number().precision(2).positive().optional(),
    estado: joi.string().valid("Aceptado", "Rechazado").optional()
  }).min(1); // 🔥 obliga a que venga al menos un campo

  const { error, value } = schema.validate(data, {
    abortEarly: false
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(", "));
  }

  return value;
};