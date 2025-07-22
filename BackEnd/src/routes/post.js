import express from 'express';
import PostController from '../controllers/post.js';
const router = express.Router();

// Get all posts
router.get('/', PostController.getAll);

// Get post by ID
router.get('/:id', PostController.getById);

// Create new post
router.post('/', PostController.create);

// Update post
router.put('/:id', PostController.update);

// Delete post
router.delete('/:id', PostController.delete);

export default router;
