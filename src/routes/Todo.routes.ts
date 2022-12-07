import { Router, Request, Response } from 'express';
import { createTodo, deleteTodobyId, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
export const TodoRouter = Router();

TodoRouter.post('/', async (req: Request, res: Response) => {
    const description: string = req.body.description as string;

    if (!description) {
        res.status(400)
        return res.send({
            message: 'No description'
        })
    }

    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newTodoId = await createTodo(description);

    res.status(201);
    res.send({
        id: newTodoId
    })
})

// Read
TodoRouter.get('/:todoId', async (req:Request, res:Response) => {
   const todoId:number = Number(req.params['todoId']);
   if(todoId <= 0){
        res.status(404);
        return res.send({
            error: 'Invalid Id'
        })
   }

   const foundTodo = await fetchTodoById(todoId);

   if(!foundTodo){
        res.status(400);
        return res.send({
            error: 'Todo not found.'
        })
   }

   res.status(200);
   return res.send( foundTodo.dataValues);
});

//Update


TodoRouter.post('/:todoId', async (req:Request, res:Response) => {
    const todoId:number = Number(req.params['todoId']);
    const body = req.body;
    if(todoId <= 0){
         res.status(404);
         return res.send({
             error: 'Invalid Id'
         })
    }
 
    const affectedrows = await updateTodoById(todoId, body);
 
    if(!affectedrows){
         res.status(400);
         return res.send({
             error: 'Something went wrong.'
         })
    }

    if(affectedrows[0] === 0){
        res.status(400);
         return res.send({
             error: 'Update failed.'
         })
    }

    const foundTodo = await fetchTodoById(todoId);


    res.status(200);
    return res.send(foundTodo);
 });
 

 // Delete

 TodoRouter.delete('/:deleteId', async (req:Request, res:Response) => {
    const todoId:number = Number(req.params['deleteId']);

    if(todoId <= 0){
         res.status(404);
         return res.send({
             error: 'Invalid Id'
         })
    }

    const deleteTodo = await deleteTodobyId(todoId);

    if(!deleteTodo){
        res.status(400);
         return res.send({
             error: 'Cannot failed.'
         })
    }
    return res.sendStatus(200);

 });
