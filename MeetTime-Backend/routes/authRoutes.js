import express from 'express';
import { login, register, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Endpoint
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/user', protect, getMe);

export default router;