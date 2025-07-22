import express from 'express';
import bodyParser from 'body-parser';

import { corsMiddleware, requestLogger, notFoundHandler, errorHandler } from './middlewares/middlewares.js';
import AuthMiddleware from './middlewares/auth.js';

import usersRouter from './routes/user.js';
import postsRouter from './routes/post.js';
import commentsRouter from './routes/comment.js';
import reactionsRouter from './routes/reaction.js';
import friendshipsRouter from './routes/friendship.js';
import notificationsRouter from './routes/notification.js';
import messagesRouter from './routes/message.js';
import uploadRouter from './routes/upload.js';
import shareRouter from './routes/share.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(requestLogger);

// Public routes (e.g. user registration/login)
app.use('/user', usersRouter);

// Protected routes (example: require auth)
app.use('/post', AuthMiddleware.authenticate, postsRouter);
app.use('/comment', AuthMiddleware.authenticate, commentsRouter);
app.use('/reaction', AuthMiddleware.authenticate, reactionsRouter);
app.use('/friendship', AuthMiddleware.authenticate, friendshipsRouter);
app.use('/notification', AuthMiddleware.authenticate, notificationsRouter);
app.use('/message', AuthMiddleware.authenticate, messagesRouter);
app.use('/upload', AuthMiddleware.authenticate, uploadRouter);
app.use('/share', AuthMiddleware.authenticate, shareRouter);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the facebook API');
});

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
