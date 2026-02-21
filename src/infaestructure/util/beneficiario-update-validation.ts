import joi from "joi";

export type ReturnUpdateBeneficiarioData = Partial<{
  tipoIdentificacion: string,
  nroidentificacion: number,
  nombre: string,
  usuario: string,
  password: string,
  direccion: string,
  email: string,
  telefono: number
}>;

export const loadUpdateBeneficiarioData = (data: any): ReturnUpdateBeneficiarioData => {

  const beneficiarioSchema = joi.object({
    tipoIdentificacion: joi.string().valid("DONANTE", "ADMINISTRADOR"),
    nroidentificacion: joi.number(),
    nombre: joi.string().trim().min(3),
    usuario: joi.string().trim().min(3),
    password: joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    direccion: joi.string().trim(),
    email: joi.string().trim().email(),
    telefono: joi.number(),
  })
  .unknown(false)
  .or(
    "tipoIdentificacion",
    "nroidentificacion",
    "nombre",
    "usuario",
    "password",
    "direccion",
    "email",
    "telefono"
  );

  const { error, value } = beneficiarioSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  if (error) {
    throw new Error(error.details.map(d => d.message).join(", "));
  }

  return value;
};



