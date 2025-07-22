import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
import notificationController from '../controllers/notification.js';
const router = express.Router();

// Get notifications for user
router.get('/user/:userId', notificationController.getAll);

// Create notification
router.post('/', notificationController.create);

// Mark notification as read
router.put('/:id/read', notificationController.update);

// Delete notification
router.delete('/:id', notificationController.delete);

export default router;
