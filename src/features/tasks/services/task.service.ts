import prisma from '../../../utils/prisma'
import { TaskInput } from '../../../types/task';

export const getAllTasks = async () => {
  return await prisma.task.findMany()
};

export const createNewTask = async (data: TaskInput ) => {
  const { title, color, completed } = data
  return await prisma.task.create({
    data: {
      title,
      color,
      completed
    }
  });
};