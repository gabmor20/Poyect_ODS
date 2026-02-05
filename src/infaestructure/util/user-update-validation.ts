import joi from "joi";

export type ReturnUpdateUserData = Partial<{
  name: string;
  email: string;
  password: string;
  status: number;
}>;

type ValidationUpdateUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUpdateUserData;
};

function validateUpdateUserData(data: any): ValidationUpdateUserData {
  const userSchema = joi
    .object({
      name: joi
        .string()
        .trim()
        .min(3)
        .pattern(/^[a-zA-Z\s]+$/)
        .messages({
          "string.min": `"El nombre debe tener al menos 3 caracteres`,
          "string.pattern.base": `"El nombre solo puede contener letras y espacios'`,
        }),

      email: joi
        .string()
        .trim()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": `"El correo no es válido'`,
        }),

      password: joi
        .string()
        .min(6)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .messages({
          "string.min": `"La contraseña debe tener al menos 6 caracteres'`,
          "string.pattern.base": `"La contraseña debe contener al menos una letra y un número'`,
        }),

      status: joi.number().valid(0, 1).messages({
        "number.base": `"El estado debe ser un número"`,
        "any.only": `"El estado debe ser 0 (inactivo) o 1 (activo)"`,
      }),
    })
    .unknown(false) // No permitir campos adicionales
    .or("name", "email", "password", "status");

  const { error, value } = userSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });

  return { error, value };
}

export const loadUpdateUserData = (data: any): ReturnUpdateUserData => {
  const result = validateUpdateUserData(data);
  if (result.error) {
    //Une todos los mensajes en una sola cadena
    const message = result.error.details.map((d) => d.message).join(", ");
    throw new Error(message);
  }

  return result.value;
};
