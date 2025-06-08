import express from 'express';
import { 
  submitContactForm, 
  getContactNotifications 
} from '../controllers/contactcontroller.js';

const router = express.Router();

// Submit form
router.post('/', submitContactForm);

// Get notifications
router.get('/notifications', getContactNotifications);

export default router;