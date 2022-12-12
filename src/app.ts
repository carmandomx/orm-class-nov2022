import express, { Application, Request, Response } from 'express';
import { TodoRouter } from './routes/Todo.routes'
import { URLRouter } from './routes/URL.routes'
import { UserRouter } from './routes/User.routes';
const app: Application = express();
app.use(express.json());

app.use('/todos', TodoRouter);
app.use('/users', UserRouter);
app.use('/u', URLRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('VIVEEEEEEEEEEE');
})

export default app;

// A.P.I