import { Request, Response } from 'express';
import { getAllTasks } from '../services/task.service'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks()
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}