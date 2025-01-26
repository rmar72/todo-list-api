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

export const deleteTaskById = async (id: number) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    return null;
  }

  return prisma.task.delete({
    where: { id },
  });
};

export const updateTaskById = async (id: number, data: { title?: string; color?: string; completed?: boolean }) => {
  try {
    return await prisma.task.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw error;
  }
};