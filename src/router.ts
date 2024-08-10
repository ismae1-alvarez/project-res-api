import { Router, Request, Response } from "express";
import { createProduct } from "./handlers/products";
import { body } from "express-validator";

const router:Router = Router();

router.get('/', (req:Request, res:Response)=>{
    res.json('Desder GET');
});

router.post('/', 

    body('name')
        .notEmpty().withMessage('El nombre del producto no pude ir vacios'),
    body('price')
        .isNumeric().withMessage("Valor no Valido debe ser numerico")
        .notEmpty().withMessage('El precio del producto no pude ir vacios')
        .custom(value => value > 0).withMessage('El precio no debe ser menos que 0'),
    createProduct
);

router.put('/', (req:Request, res:Response)=>{
    res.json('Desder PUT');
});

router.patch('/', (req:Request, res:Response)=>{
    res.json('Desder PATCH');
});

router.delete('/', (req:Request, res:Response)=>{
    res.json('Desder DELETE');
});

export default router;
