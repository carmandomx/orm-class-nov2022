import { Router, Request, Response } from 'express'
import { createURL, fetchUrlById  } from '../repository/URL.repo';
import { v4 as uuidv4 } from 'uuid';
export const URLRouter = Router();

URLRouter.post('/new', async (req: Request, res: Response) => {

    const origUrl = req.body.origUrl as string;

    if (!origUrl) {
        res.status(400);
        res.send({
            error: 'No original URL was provided'
        })
    }


    const newId = uuidv4().split('-')[0];

    const newUrl = await createURL(newId, origUrl);
    return res.json({
        newUrl: 'http://localhost:3000/u/' + newUrl
    })
})

URLRouter.get('/:uuid', async (req: Request, res: Response) => {


    const uuid = req.params['uuid'] as string;

    if (!uuid) {
        res.status(400);
        return res.send({
            error: 'No ID provided'
        })
    }
    


    const Url = await fetchUrlById(uuid);

    if (!Url) {
        res.status(400);
        return res.send({
            error: 'No URL with this ID was found'
        })
    }
    
    return res.redirect(Url)


})