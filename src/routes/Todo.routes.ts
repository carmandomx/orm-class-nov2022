import { Router, Request, Response } from 'express';
import { createTodo, deleteTodoById, fetchTodoById, updateTodoById } from '../repository/Todo.repo'
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

TodoRouter.get('/:todoId', async (req: Request, res: Response) => {

    const todoId = Number(req.params['todoId']);

    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundTodo = await fetchTodoById(todoId);

    if (!foundTodo) {

        res.status(400)
        return res.send({
            error: 'Todo not found.'
        })

    }

    // TodoId es mayor a 0 y Todo con el TodoId existe en la DB
    res.send(foundTodo)

})

TodoRouter.put('/:todoId', async (req: Request, res: Response) => {
    const todoId = Number(req.params['todoId']);
    const body = req.body;
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const affectedRows = await updateTodoById(todoId, body);

    if (!affectedRows) {

        res.status(500);
        return res.send({
            error: 'Something went wrong! :)'
        })
    }

    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        })
    }

    const foundTodo = await fetchTodoById(todoId);

    res.status(200)
    return res.send(foundTodo)
})

TodoRouter.delete('/:todoId', async (req: Request, res: Response) => {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const ar = await deleteTodoById(todoId);

    if (!ar)  {
        return res.status(400).send({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus(200);
})