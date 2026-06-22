import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getUserCount } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/users/count', getUserCount);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;