import { Request, Response, RequestHandler } from 'express';
import { getAllTasks, createNewTask } from '../services/task.service'
import { TaskInput } from '../../../types/task';
import { z } from 'zod';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

const taskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  completed: z.boolean(),
});

export const createTask: RequestHandler = async (req, res): Promise<void> => {
  try {
    const parsedData = taskSchema.safeParse(req.body);

    if (!parsedData.success) {
      const error = parsedData.error.errors[0];
      res.status(400).json({ error: error.message });
      return
    }

    const taskData: TaskInput = parsedData.data

    const newTask = await createNewTask(taskData);
    res.status(201).json(newTask);
    return
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}