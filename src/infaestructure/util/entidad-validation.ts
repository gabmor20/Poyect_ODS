import joi from "joi";
import { loadEmail } from "./email-validation";

export type ReturnEntidadData = {
    nit: number;
    razonSocial: string;
    usuario: string;
    password: string;
    tipoEntidad: string;
    direccion: string;
    email: string;
    telefono: number;
};

export const loadEntidadData = (data: any): ReturnEntidadData => {

    const schema = joi.object({
        nit: joi.number().required(),
        razonSocial: joi.string().min(3).required(),
        usuario: joi.string().min(3).required(),
        password: joi.string().min(6).required(),
        tipoEntidad: joi.string().valid("DONANTE", "ADMIN").required(),
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
