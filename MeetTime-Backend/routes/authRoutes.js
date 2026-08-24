import express from 'express';
import { login, register, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginRateLimit, registerRateLimit } from '../middleware/authRateLimit.js';

const router = express.Router();

// Endpoint
router.post('/register', registerRateLimit, register);
router.post('/login', loginRateLimit, login);
router.post('/logout', logout);

router.get('/user', protect, getMe);

export default router;
