import express from 'express';
import UserController from '../controllers/user.js';

const router = express.Router();
router.get('/', UserController.getAll);

router.get('/id/:id', UserController.getById);

router.post('/', UserController.create);

router.put('/id/:id', UserController.update);

router.delete('/id/:id', UserController.delete);

// router.post('/test', UserController.test);

router.post('/login', UserController.findByEmail);

router.get('/test', (_, res) => {
    res.send('This is working!');
});

export default router;
