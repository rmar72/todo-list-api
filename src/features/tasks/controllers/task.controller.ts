import { Request, Response, RequestHandler } from 'express';
import { getAllTasks, createNewTask, deleteTaskById } from '../services/task.service'
import { TaskInput } from '../../../types/task';
import { z } from 'zod';
import { allowedColors } from '../constants';
import logger from '../../../utils/logger';


export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    logger.error(`Error fetching task: ${error}`);
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

const taskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  color: z.string()
    .min(1, { message: 'Color is required' }) // Ensure it's not empty
    .refine((value) => allowedColors.includes(value), {
      message: `Color must be one of: ${allowedColors.join(', ')}`,
    }),
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
    logger.error(`Error creating task: ${error}`);
    res.status(500).json({ error: 'Failed to create task' })
  }
}

export const deleteTask: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }

    const deletedTask = await deleteTaskById(Number(id));

    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting task: ${error}`);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
