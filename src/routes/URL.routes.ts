import { Router, Request, Response } from 'express';
import { createURL } from '../repository/URL.repo'
import {v4 as uuidv4} from 'uuid';
import { hostname } from 'os';
export const URLRouter = Router();

URLRouter.post('/', async (req: Request, res: Response) => {
    const uurl: string = req.body.origUrl as string;

    if (!uurl) {
        res.status(400)
        return res.send({
            message: 'No url'
        })
    }

    // Si tengo mi url
    // Debo crear un nuevo URL y guardarlo a la DB
    // pero primero creo el id unico
    const newId =  uuidv4();
    const newURLId = await createURL(newId, uurl);

    res.status(201);
    res.send({
        newURL: 'http://'+<string>process.env.DB_HOSTNAME+'/'+ newId,
    })
})