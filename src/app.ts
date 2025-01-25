import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes  from './features/tasks/routes/task.routes';

dotenv.config()

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

export default app;