import { Router, Request, Response } from "express";

const router:Router = Router();

router.get('/', (req:Request, res:Response)=>{
    res.json('Desder GET');
});

router.post('/', (req:Request, res:Response)=>{
    res.json('Desder POST');
});

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
