import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {User} from '../entities/User';
import envs from './enviroment-vars';


dotenv.config();

export const AppDataSource = new DataSource ({
    type: "mysql",
    port:Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    host: envs.DB_HOST,
    database: envs.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],

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