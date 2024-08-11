import request from 'supertest';
import server, {connectDB} from '../server';
import db from '../config/db';

describe('GET /api', ()=>{
    test('should send back a json response', async()=>{
        const res = await request(server).get('/api');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe("Desde Api");

        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe('desde api');
    });

});

jest.mock('../config/db');

describe('connectDB', ()=>{
    test('should handle connection error', async()=>{

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error'));
        const consoleSpy =jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error')
        );
    });
});