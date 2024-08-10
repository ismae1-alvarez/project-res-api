import { Router, Request, Response } from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router:Router = Router();

router.get('/', getProduct);
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
);

router.post('/', 
    body('name')
        .notEmpty().withMessage('El nombre del producto no pude ir vacios'),
    body('price')
        .isNumeric().withMessage("Valor no Valido debe ser numerico")
        .notEmpty().withMessage('El precio del producto no pude ir vacios')
        .custom(value => value > 0).withMessage('El precio no debe ser menos que 0'),
    handleInputErrors,
    createProduct
);

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'), 
    body('name')
        .notEmpty().withMessage('El nombre del producto no pude ir vacios'),
    body('price')
        .isNumeric().withMessage("Valor no Valido debe ser numerico")
        .notEmpty().withMessage('El precio del producto no pude ir vacios')
        .custom(value => value > 0).withMessage('El precio no debe ser menos que 0'),
    body('availability')
        .isBoolean().withMessage('El valor no es valido'),
    handleInputErrors,
    updateProduct
);

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
);

export default router;
