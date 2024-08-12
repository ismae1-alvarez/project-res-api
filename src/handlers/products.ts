import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";


export const getProduct = async(_:Request, res:Response)=>{
    const products = await Product.findAll({
        order : [
            ['id', 'DESC']
        ],
        attributes :{exclude : ['createdAt', 'updatedAt']}
    });
    return res.json({data : products});
};

export const getProductById = async(req:Request, res:Response)=>{
    const {id} =  req.params;

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Produto no encontrado'});

    return res.json({data : product});
};

export const createProduct = async(req:Request, res:Response)=>{
    const product = await Product.create(req.body);

    return res.status(201).json({data :product});

};  

export const updateProduct = async (req:Request, res:Response)=>{
    const {id} =  req.params;

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Produto no encontrado'});


    //Update 
    await product.update(req.body);

    await product.save();

    return res.json({data : product});
};

export const updateAvailability =  async(req:Request, res:Response)=>{
    const {id} =  req.params;

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Produto no encontrado'});

    //Update 
   product.availability =  !product.dataValues.availability;

    await product.save();

    return res.json({data : product});
};

export const deleteProduct = async(req:Request, res:Response)=>{
    const {id} =  req.params;

    const product = await Product.findByPk(id);

    if(!product) return res.status(404).json({error: 'Produto no encontrado'});

    await product.destroy();

    return res.json({data : "Producto eliinado"});
};