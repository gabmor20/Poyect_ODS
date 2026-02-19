import joi from "joi";

export type ReturnLoteData = {
  codigo: string;
  descripcion: string;
  entidadId: number;
};

export const loadLoteData = (data: any): ReturnLoteData => {

  const schema = joi.object({
    codigo: joi.string().trim().min(2).required(),
    descripcion: joi.string().trim().min(3).required(),
    entidadId: joi.number().required()
  });

  const { error, value } = schema.validate(data, {
    abortEarly: false
  });

  if (error) {
    throw new Error(
      error.details.map(d => d.message).join(", ")
    );
  }

  return value;
};

