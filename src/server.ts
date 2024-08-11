import  express, {Express, Request, Response}  from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgBlue.bold('Conexion exitosa a la BD'));
    } catch (error) {
        // console.log(error);
        console.log(colors.bgRed.bold('Hubo un error'));
    };
};

connectDB();

// intancia se Express
const server:Express = express();

// Leer datos de formulario middleware
server.use(express.json());

// Rounting
server.use('/api/products/', router);

server.get('/api', (req:Request, res:Response)=>{
    res.json({msg: 'Desde Api'})
})



export default server;