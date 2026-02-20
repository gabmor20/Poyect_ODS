import joi from "joi";

export type ReturnLoteData = {
  codigo: string;
  cantidad: number;
  clasificacion: string;
  fechaVencimiento: Date;
  entidadId: number;
  costoTotal: number;
};

export const loadLoteData = (data: any): ReturnLoteData => {

  const schema = joi.object({
    codigo: joi.string().required(),
    cantidad: joi.number().required(),
    clasificacion: joi.string().length(1).required(),
    fechaVencimiento: joi.date().required(),
    entidadId: joi.number().required(),
    costoTotal: joi.number().precision(2).required()
  });

  const { error, value } = schema.validate(data, {
    abortEarly: false
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(", "));
  }

  return value;
};

