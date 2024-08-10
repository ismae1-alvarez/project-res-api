import  express, {Express}  from "express";
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        console.log('Conexion exitosa a la BD');
    } catch (error) {
        console.log(error);
        console.log('Hubo un error')
    };
};

connectDB();

const server:Express = express();

// Rounting
server.use('/api/productos/', router)



export default server;