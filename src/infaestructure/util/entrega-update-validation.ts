import { body } from "express-validator";
import { EstadoEntrega } from "../entities/Entrega";

export const updateEntregaValidation = [

  body("estado")
    .notEmpty()
    .withMessage("Estado es obligatorio")
    .isIn(Object.values(EstadoEntrega))
    .withMessage("Estado debe ser PENDIENTE o ENVIADO"),
];
