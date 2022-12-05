import { Router, Request, Response } from 'express';
import { createURL, fetchUrlById } from '../repository/URL.repo'
import {v4 as uuidv4} from 'uuid';

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
    const newId =  uuidv4().split('-')[0];
    const newURLId = await createURL(newId, uurl);

    res.status(201);
    res.send({
        newURL: 'http://'+<string>process.env.DB_HOSTNAME+'/'+ newURLId,
    })
})


URLRouter.get('/:uuid', async (req, res:Response) => {

    const uuid = req.params['uuid'] as string;
    if (!uuid) {
        res.status(400).send({
            error: 'No ID provided'
        })
    }


    const url_ = await fetchUrlById(uuid);

    if (!url_) {
        res.status(400).send({
            error: 'No URL with this ID was found'
        })
    }

     res.redirect(url_);

});