import express from 'express';
import pool from '../db/index.js';
import UserController from '../controllers/user.js';

const router = express.Router();
router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

export default router;
