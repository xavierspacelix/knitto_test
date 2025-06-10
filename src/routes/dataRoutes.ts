import { Router } from 'express';
import { createProduct } from '../controllers/dataController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/products', authMiddleware, createProduct);

export default router;