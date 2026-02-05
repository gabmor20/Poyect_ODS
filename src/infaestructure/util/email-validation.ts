import joi from "joi";

export type ReturnEmail = {
  email: string;
};

type ValidationEmail = {
  error: joi.ValidationError | undefined;
  value: ReturnEmail;
};

function validateEmail(data: any): ValidationEmail {
  const emailSchema = joi
    .object({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": `"El correo no es válido'`,
          "string.empty": `"El correo es requerido`,
        }),
    })
    .unknown(false); // No permitir campos adicionales

  const { error, value } = emailSchema.validate(data, {
    abortEarly: false,
  });

  return { error, value };
}

export const loadEmail = (data: any): ReturnEmail => {
  const result = validateEmail(data);
  if (result.error) {
    //Une todos los mensajes en una sola cadena
    const message = result.error.details.map((d) => d.message).join(", ");
    throw new Error(message);
  }

  return result.value;
};
