import { Router } from 'express';
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', auth, getCurrentUser);

export { authRouter };
