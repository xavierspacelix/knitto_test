import { Router } from 'express';
import { loginWithEmail, loginWithGoogle } from '../controllers/authController';

const router = Router();

router.post('/login/email', loginWithEmail);
router.post('/login/google', loginWithGoogle);

export default router;