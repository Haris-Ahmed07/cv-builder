import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getResume, 
  saveResume, 
  deleteResume 
} from '../controllers/resumeController.js';

// Create a new Express router instance
const router = express.Router();

// Apply the protect middleware to all routes in this router (all routes require authentication)
router.use(protect);

// Main resume route: GET retrieves, POST creates/updates, DELETE removes a resume
router.route('/')
  .get(getResume)
  .post(saveResume)
  .delete(deleteResume);

// Export the router for use in the app
export default router;
