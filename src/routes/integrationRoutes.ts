import { Router } from 'express';
import { syncExternalProducts } from '../controllers/integrationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/sync-products', authMiddleware, syncExternalProducts);

export default router;