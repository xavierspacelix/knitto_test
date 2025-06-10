import { Router } from 'express';
import { scheduleNotification } from '../controllers/scheduleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/schedule', authMiddleware, scheduleNotification);

export default router;