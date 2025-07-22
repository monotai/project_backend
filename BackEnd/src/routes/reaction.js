import express from 'express';
import reactionsController from '../controllers/reaction.js';
const router = express.Router();

// Get reactions by target (type + id)
router.get('/:target_type/:target_id', reactionsController.getAll);

// Create reaction
router.post('/', reactionsController.create);

// Delete reaction by ID
router.delete('/:id', reactionsController.delete);

export default router;
