import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const createProduct = async(req:Request, res:Response)=>{

    // Validacion 
    


    let errores =  validationResult(req);

    if(!errores.isEmpty()) return res.status(400).json({errores : errores.array()});

    const product = await Product.create(req.body);

    return res.json({data :product});

};  