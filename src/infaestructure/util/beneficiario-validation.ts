import joi from "joi";
import { loadEmail } from "./email-validation";

export type ReturnBeneficiarioData = {
    tipoIdentificacion: string;
    nroidentificacion: number;
    nombre: string;
    usuario: string;
    password: string;
    direccion: string;
    email: string;
    telefono: number;
};

export const loadBeneficiarioData = (data: any): ReturnBeneficiarioData => {

    const schema = joi.object({
        tipoIdentificacion: joi.string().valid("C","P","N","E").required(),
        nroidentificacion: joi.number().required(),
        nombre: joi.string().min(3).required(),
        usuario: joi.string().min(3).required(),
        password: joi.string().min(6).required(),
        direccion: joi.string().optional(),
        email: joi.string().optional(),
        telefono: joi.number().optional()
    });

    const { error, value } = schema.validate(data);

    if (error) {
        throw new Error(error.details.map(d => d.message).join(", "));
    }

    return value;
};
