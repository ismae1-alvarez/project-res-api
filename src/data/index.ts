import { exit } from "node:process";
import db from '../config/db';

const clearDB = async()=>{
    try {
        await db.sync({force :true});
        console.log('Datos eliminados correctamente');
        exit(0);
    } catch (error) {
        console.log(error);
        // Cuando es exitosos el valor es 0 por eso se pone 1
        exit(1);
    };
};

if(process.argv[2] === '--clear') clearDB();