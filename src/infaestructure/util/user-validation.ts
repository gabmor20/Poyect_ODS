import joi from "joi";

export type ReturnUserData = {
  name: string;
  email: string;
  password: string;
  status: number;
};

type ValidationUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUserData;
};

function validateUserData(data: any): ValidationUserData {
  const userSchema = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
          "string.base": `"El nombre debe ser un texto'`,
          "string.empty": `El nombre es requerido`,
          "string.min": `"El nombre debe tener al menos 3 caracteres`,
          "string.pattern.base": `"El nombre solo puede contener letras y espacios'`,
        }),

      email: joi
        .string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.base": `"El correo debe ser un texto'`,
          "string.empty": `El correo es requerido`,
          "string.email": `"El correo debe tener un formato válido'`,
        }),

      password: joi
        .string()
        .min(6)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .required()
        .messages({
          "string.min": `"La contraseña debe tener al menos 6 caracteres'`,
          "string.pattern.base": `"La contraseña debe contener al menos una letra y un número'`,
          "string.empty": `La contraseña es requerida`,
        }),

      status: joi.number().valid(0, 1).required().messages({
        "number.base": `"El estado debe ser un número"`,
        "any.only": `"El estado debe ser 0 (inactivo) o 1 (activo)"`,
        "number.required": `El estado es requerido`,
      }),
    })
    .unknown(false); // No permitir campos adicionales

  const { error, value } = userSchema.validate(data, { abortEarly: false });

  return { error, value: value as ReturnUserData };
}

export const loadUserData = (data: any): ReturnUserData => {
  const result = validateUserData(data);
  if (result.error) {
    //Une todos los mensajes en una sola cadena
    const message = result.error.details.map((d) => d.message).join(", ");
    throw new Error(message);
  }

  return result.value;
};
