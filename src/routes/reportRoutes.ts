import { Router } from 'express';
import { getTopCustomers } from '../controllers/reportController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/top-customers', authMiddleware, getTopCustomers);

export default router;