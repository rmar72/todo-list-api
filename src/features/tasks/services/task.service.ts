import prisma from '../../../utils/prisma'

export const getAllTasks = async () => {
  return await prisma.task.findMany()
}