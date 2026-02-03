import app from "./app";
import { ServerBootStrap } from "./infaestructure/bootstrap/server.bootstrap"; 
import { connectDB } from "./infaestructure/config/data_base";

const serverBootStrap = new ServerBootStrap(app);

/**
 * Funcion tipo clásica para iniciar el servidor
 */

async function startServer(){
    try{
        const instances = [serverBootStrap.initialize()];
        await Promise.all(instances);

    }catch(error){
        console.log(error);
    }
}

/**
 * Función tipo flecha para iniciar el servidor
 */

const startServerFlecha = async () =>{
    try{
        const instances = [serverBootStrap.initialize()];
        await Promise.all(instances);
    }catch(error){
        console.log(error);
    }
}

/**
 * Función autoinvocada para iniciar el servidor

 */
(async () =>{
    try{
        const instances = [
            connectDB(), // Conectar a la base de datos
            serverBootStrap.initialize() //iniciar el servidor
        ];
        await Promise.all(instances);
    }catch(error){
        console.log("Error al iniciar el servidor:", error);
        process.exit(1);
    }
})();



/**
 * Invocación de funciones
 */

//startServer();
//startServerFlecha();
