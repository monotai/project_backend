import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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

import sequelize from './db/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());
app.use(corsMiddleware);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Logging & JSON Parser
app.use(requestLogger);
app.use(express.json()); // replaces body-parser

// Routes - Public
app.use('/user', usersRouter);

// Routes - Protected
app.use('/post', AuthMiddleware.authenticate, postsRouter);
app.use('/comment', AuthMiddleware.authenticate, commentsRouter);
app.use('/reaction', AuthMiddleware.authenticate, reactionsRouter);
app.use('/friendship', AuthMiddleware.authenticate, friendshipsRouter);
app.use('/notification', AuthMiddleware.authenticate, notificationsRouter);
app.use('/message', AuthMiddleware.authenticate, messagesRouter);
app.use('/upload', AuthMiddleware.authenticate, uploadRouter);
app.use('/share', AuthMiddleware.authenticate, shareRouter);

// Base Route
app.get('/', (req, res) => {
  res.send('📘 Welcome to the Facebook API');
});

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Sync DB and Start Server
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Keep schema in sync without data loss
    console.log('📦 Database synced');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err);
  }
})();
