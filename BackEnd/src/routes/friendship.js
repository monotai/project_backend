import express from 'express';
import friendshipController from '../controllers/friendship.js';
const router = express.Router();

// Get friendships for a user
router.get('/user/:userId', friendshipController.getAll);

// Create friendship request
router.post('/', friendshipController.create);

// Update friendship status
router.put('/:id', friendshipController.update);

// Delete friendship
router.delete('/:id', friendshipController.delete);

export default router;