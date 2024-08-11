import swaggerJSDoc from "swagger-jsdoc";

const option : swaggerJSDoc.Operation= {
    swaggerDefinition :{
        openapi :'3.0.2',
        tags :[
            {
                name : 'Products',
                description : 'API opration related to products'
            }
        ],
        info : {
            title : 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description : 'REST Docs for Products'
        }, 
    },
    apis : ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(option);

export default swaggerSpec;