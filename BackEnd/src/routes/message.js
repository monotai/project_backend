import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
import messageController from '../controllers/message.js';
const router = express.Router();

// Get messages between two users (simple example)
router.get('/between/:user1/:user2', messageController.getAll);

// Send a message
router.post('/', messageController.create);

// Delete message
router.delete('/:id', messageController.delete);

export default router;