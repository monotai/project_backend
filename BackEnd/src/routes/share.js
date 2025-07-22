import express from 'express';
import ShareController from '../controllers/share.js';
const router = express.Router();

router.get('/user/:userId', ShareController.getAll);
router.get('/:id', ShareController.getById);
router.post('/user/:userId', ShareController.create);
router.put('/:id', ShareController.update);
router.delete('/:id', ShareController.delete);

export default router;