import request from "supertest";
import server from "../../server";

describe('POST /api/products', ()=>{

    test('should display validation errores', async()=>{
      
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(4);

        expect(response.status).not.toBe(402);
        expect(response.body.errores).not.toHaveLength(1);
    });

    test('should validate that the price is greater than 0', async()=>{
      
        const response = await request(server).post('/api/products').send({
            "name" :"Tv", 
            "price" : 0
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(1);

        expect(response.status).not.toBe(402);
        expect(response.body.errores).not.toHaveLength(2);
    });

    test('should validate that the price is a number and greater than 0', async()=>{
      
        const response = await request(server).post('/api/products').send({
            "name" :"Tv", 
            "price" : "Hola"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(2);

        expect(response.status).not.toBe(402);
        expect(response.body.errores).not.toHaveLength(3);
    });



    test('should create a new product', async()=>{

        const response = await request(server).post('/api/products').send({
            "name" :"Tv", 
            "price" : 1000
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(202);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('GET /api/products', ()=>{

    test('should check if api/products url exists', async()=>{
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    });

    test('GET a JSON response with products', async()=>{
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toBe('errores');
    });
});

describe('GET /api/products/:id', ()=>{
    test('Should return a 404 response for a non-existent product', async()=>{
        const productId =  2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Produto no encontrado');
    });

    test('should check a valid ID in the URL', async()=>{
        const response = await request(server).get(`/api/products/no`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(1);
        expect(response.body.errores[0].msg).toBe('ID no valido');
    });

    test('GET a JSON for a single product', async()=>{
        const response = await request(server).get(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('PUT /api/products/.id', ()=>{
    test('should check a valid ID in the URL', async()=>{
        const response = await request(server).put(`/api/products/no`).send({
            "name" :"Tv", 
            "price" : 200,
            "availability": true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(1);
        expect(response.body.errores[0].msg).toBe('ID no valido');
    });

    test('should display validation error messages when updating a product', async()=>{
        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toBeTruthy();
        expect(response.body.errores).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('should  validation that the price is greater than 0 ', async()=>{
        const response = await request(server).put('/api/products/1').send({
            "name" :"Tv", 
            "price" : 0,
            "availability": true
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toBeTruthy();
        expect(response.body.errores).toHaveLength(1);
        expect(response.body.errores[0].msg).toBe('El precio no debe ser menos que 0')

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('should return a 404 response for a non-existent product ', async()=>{
        const productId =  2000;

        const response = await request(server).put(`/api/products/${productId}`).send({
            "name" :"Tv", 
            "price" : 200,
            "availability": true
          });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Produto no encontrado');


        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('should update an existing product with valid data', async()=>{

        const response = await request(server).put(`/api/products/1`).send({
            "name" :"Tv", 
            "price" : 209,
            "availability": true
          });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(404);
        expect(response.body).not.toBe('errores');
    });
});

describe('PATCH /api/products/:id', ()=>{
    test('should check a valid ID in the URL', async()=>{
        const response = await request(server).patch(`/api/products/no`).send({
            "availability": true
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(1);
        expect(response.body.errores[0].msg).toBe('ID no valido');
    });

    test('should return a 404 response for a non-existent product ', async()=>{
        const productId =  2000;

        const response = await request(server).patch(`/api/products/${productId}`).send({
            "availability": true
          });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Produto no encontrado');


        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('sholud update the produt availability', async()=>{
        const response = await request(server).patch('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(false);

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errores');
    });
});

describe('DELETE /api/product/:id', ()=>{
    test('should check a valid ID in the URL', async()=>{
        const response = await request(server).delete(`/api/products/no`).send();

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errores');
        expect(response.body.errores).toHaveLength(1);
        expect(response.body.errores[0].msg).toBe('ID no valido');
    });


    test('should return a 404 response for a non-existent prouct', async()=>{
        const productId =  2000;

        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Produto no encontrado');


        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('should delete a product', async()=>{
        const response = await request(server).delete(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Producto eliinado');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });
});

