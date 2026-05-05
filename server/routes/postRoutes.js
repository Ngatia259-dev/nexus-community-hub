import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.js';
import { addComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Post routes
router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

// Comment routes (nested under posts)
router.post('/:postId/comments', protect, addComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

export default router;
