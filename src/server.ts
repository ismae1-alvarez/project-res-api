import  express, {Express}  from "express";
import cors, {CorsOptions} from "cors";
import morgan from "morgan"
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
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

// Permitir conexion
const corsOptions : CorsOptions = {
    origin: function(requestOrigin, callback) {
       if(requestOrigin === process.env.FRONTEND_URL){
            callback(null, true);
       }else{
            callback(new Error('Errror de cors'));
    }
    },
};
server.use(cors(corsOptions));

// Leer datos de formulario middleware
server.use(express.json());


server.use(morgan('dev'));

// Rounting
server.use('/api/products/', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


export default server;