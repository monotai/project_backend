import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4576;

// Middleware
app.use(bodyParser.json());

// Import routers
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';
import reactionsRouter from './routes/reactions.js';
import friendshipsRouter from './routes/friendships.js';
import notificationsRouter from './routes/notifications.js';
import messagesRouter from './routes/messages.js';

// Use routers
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/reactions', reactionsRouter);
app.use('/friendships', friendshipsRouter);
app.use('/notifications', notificationsRouter);
app.use('/messages', messagesRouter);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Chat API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
