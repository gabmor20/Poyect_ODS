import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

export type ReturnEnviromentVars = {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

type ValidationEnviromentVars = {
    error: Joi.ValidationError | undefined;
    value: ReturnEnviromentVars;
}

function validateEnvVars(vars: NodeJS.ProcessEnv): ValidationEnviromentVars{
    const envSchema = Joi.object({
        PORT: Joi.number().optional(),
        DB_HOST: Joi.string().optional(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().optional(),
        DB_PASSWORD: Joi.string().optional().allow(''),
        DB_NAME: Joi.string().optional(),
    }).unknown(true);

    const{error, value} = envSchema.validate(vars);

    return{error, value};

}

const loadEnvVars = (): ReturnEnviromentVars => {
    //validar datos de entorno

    const result =  validateEnvVars(process.env);

    if(result.error){
        throw new Error(result.error.message);
    }

    const value = result.value;

    return{
        PORT: value.PORT,
        DB_HOST: value.DB_HOST,
        DB_PORT: value.DB_PORT,
        DB_USER: value.DB_USER,
        DB_PASSWORD: value.DB_PASSWORD,
        DB_NAME: value.DB_NAME,
    }
}

const envs = loadEnvVars();

export default envs;