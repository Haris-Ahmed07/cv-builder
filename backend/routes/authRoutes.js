import express from 'express';
import { signupUser, signinUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/signin', signinUser);
router.get('/me', protect, getMe);

export default router;
