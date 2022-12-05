import express, { Application, Request, Response } from 'express';
const app: Application = express();
import { TodoRouter } from './routes/Todo.routes'
import { URLRouter } from './routes/URL.routes'

app.use(express.json());

app.use('/todos', TodoRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

app.use('/url', URLRouter);



export default app;

/**
 Tarea:
 For the Todo:

 -READ
 -UPDATE
 -DELETE

 Repositorio/Modelo/Rutas

 
 */