import { Router, Request, Response } from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router:Router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 
 *                  price:
 *                      type: string
 *                      description: The Product price
 *                      example: $4000
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: GET a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: GET a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID  
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new recor in teh database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor de 49 pulgadas'
 *                          price:
 *                              type: number
 *                              example: 499
 *      responses:
 *          201:
 *              description: Product created successfully
 *          400:
 *              description: Bad Request - Invalid input data                          
 */

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

/**
 * @swagger
 *  /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: 'Monitor de 49 pulgadas'
 *                          price:
 *                              type: number
 *                              example: 499
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  appllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Produc Not Found
 *                   
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  appllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Produc Not Found
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete Product 
 *      tags:
 *          - Products
 *      description: Delete Produt of Databse
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  appllication/json:
 *                      schema:
 *                         type: string
 *                         example: 'Producto eliinado'
 *          400:
 *              description: Bad Request - Invalid ID 
 *          404:
 *              description: Produc Not Found
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
);

export default router;
