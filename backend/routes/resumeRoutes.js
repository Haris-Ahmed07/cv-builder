import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getResume, 
  saveResume, 
  deleteResume 
} from '../controllers/resumeController.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/')
  .get(getResume)
  .post(saveResume)
  .delete(deleteResume);

export default router;
