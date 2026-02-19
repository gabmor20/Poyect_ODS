import joi from "joi";

export type ReturnUpdateEntidadData = Partial<{
  nit: number,
  razonSocial: string,
  usuario: string,
  password: string,
  tipoEntidad: string,
  direccion: string,
  email: string,
  telefono: number
}>;

export const loadUpdateEntidadData = (data: any): ReturnUpdateEntidadData => {

  const entidadSchema = joi.object({
    nit: joi.number(),
    razonSocial: joi.string().trim().min(3),
    usuario: joi.string().trim().min(3),
    password: joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    tipoEntidad: joi.string().valid("DONANTE", "ADMINISTRADOR"),
    direccion: joi.string().trim(),
    email: joi.string().trim().email(),
    telefono: joi.number(),
  })
  .unknown(false)
  .or(
    "nit",
    "razonSocial",
    "usuario",
    "password",
    "tipoEntidad",
    "direccion",
    "email",
    "telefono"
  );

  const { error, value } = entidadSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(", "));
  }

  return value;
};



