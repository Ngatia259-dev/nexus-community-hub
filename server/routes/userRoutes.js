import express from 'express';
import {
    getUsers,
    getUser,
    updateMe,
    getUserPosts
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/me', protect, updateMe);
router.get('/:id/posts', getUserPosts);

export default router;
