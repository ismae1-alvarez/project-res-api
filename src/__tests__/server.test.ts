import request from 'supertest';
import server, {connectDB} from '../server';
import db from '../config/db';


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