import express from 'express';
import { signupUser, signinUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

// Create a new Express router instance
const router = express.Router();

// Route for user signup (registration)
router.post('/signup', signupUser);
// Route for user signin (login)
router.post('/signin', signinUser);
// Route to get current user info (protected)
router.get('/me', protect, getMe);

// Export the router for use in the app
export default router;
