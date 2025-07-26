import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware, requestLogger, notFoundHandler, errorHandler } from './middlewares/middlewares.js';
import authMiddleware from './middlewares/auth.js';

import usersRouter from './routes/user.js';
import postsRouter from './routes/post.js';
import commentsRouter from './routes/comment.js';
import reactionsRouter from './routes/reaction.js';
import friendshipsRouter from './routes/friendship.js';
import notificationsRouter from './routes/notification.js';
import messagesRouter from './routes/message.js';
import uploadRouter from './routes/upload.js';
import shareRouter from './routes/share.js';

import sequelize from './db/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middlewares
app.use(corsMiddleware);
app.use(requestLogger);
app.use(express.json());

// Public Routes
app.use('/user', usersRouter);
app.use('/upload', uploadRouter);

// Protected Routes
const protectedRoutes = [
  ['post', postsRouter],
  ['comment', commentsRouter],
  ['reaction', reactionsRouter],
  ['friendship', friendshipsRouter],
  ['notification', notificationsRouter],
  ['message', messagesRouter],
  ['share', shareRouter],
];

protectedRoutes.forEach(([path, router]) => {
  app.use(`/${path}`, authMiddleware.authenticate, router);
});

app.get('/test-auth', authMiddleware.authenticate, (req, res) => {
  res.json({
    message: '✅ Access granted',
    user: req.user,
  });
});


// Health & Welcome Route
app.get('/', (req, res) => {
  res.send('📘 Welcome to the Facebook API');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404 & Error Handlers (Always last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection authenticated');

    await sequelize.sync(); // In production, prefer migrations
    console.log('📦 Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
})();
