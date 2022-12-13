import { Router, Request, Response } from "express";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

export const UserRouter = Router();

// Este endpoint debe poder ser llamado por todo el mundo
UserRouter.post('/newUser',async (req:Request, res: Response) => {
    
    


    const { displayName, email, password }  = req.body

    if (!displayName || !email || !password) {
        return res.status(400).send({error: 'Missing fields'})
    }


    try {
        const userId = await createUser(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        })
    } catch (error) {
        res.status(500).send({error: 'something went wrong'})
    }

})


// Debe solo poder ser llamado por el rol de admin y el usuario dueño de este recurso
UserRouter.get('/:userId', isAuthenticated, isAuthorized({ roles: ['admin'], allowSamerUser: true }), async (req:Request, res: Response) => {
    // Dos formas de obtener el userId
    const { userId } = req.params;

    // 2da forma
    const { uid } = res.locals;

    try {
        const user = await readUser(userId);
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({error: 'something went wrong'})
    }
})