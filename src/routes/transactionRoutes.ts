import { Router } from 'express';
import { createOrder } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/orders', authMiddleware, createOrder);

export default router;