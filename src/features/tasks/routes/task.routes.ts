import { Router } from 'express';
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/task.controller';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask)

export default router;
