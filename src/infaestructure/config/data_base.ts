import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {User} from '../entities/User';
import envs from './enviroment-vars';


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres", 
    url: 'postgresql://neondb_owner:npg_wPCrHX5Ok0DR@ep-soft-shadow-aewfedl7-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require', // La que empieza por postgresql://
    ssl: {
        rejectUnauthorized: false // Obligatorio para conectar con bases de datos en la nube como Neon
    },
    synchronize: true, // Esto creará las tablas automáticamente en la nube basándose en tus entidades
    logging: true,
    entities: [User], // Mantiene tu entidad de usuario para que se cree la tabla
});

//Metodo para conectar la DB

export const connectDB = async () =>{
    try{
        await AppDataSource.initialize();
        console.log('Conectado a la base de');
    }catch(error){
        console.error('Error de conexión a la base de datos:', error);
        process.exit(1);
    }
}