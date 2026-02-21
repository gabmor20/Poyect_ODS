import { body } from "express-validator";

export const createEntregaValidation = [

  body("id_beneficiario")
    .notEmpty()
    .withMessage("id_beneficiario es obligatorio")
    .isInt()
    .withMessage("id_beneficiario debe ser numérico"),

  body("lotes")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un lote"),

  body("lotes.*")
    .isInt()
    .withMessage("Cada lote debe ser un número válido"),
];