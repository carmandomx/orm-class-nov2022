import { Router, Request, Response } from "express";
import { createUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";

export const UserRouter = Router();

UserRouter.post('/newUser',async (req:Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado

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