import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4576;

// Middleware
app.use(bodyParser.json());

// Import routers
import usersRouter from './src/routes/users.js';
import postsRouter from './src/routes/posts.js';
import commentsRouter from './src/routes/comments.js';
import reactionsRouter from './src/routes/reactions.js';
import friendshipsRouter from './src/routes/friendships.js';
import notificationsRouter from './src/routes/notifications.js';
import messagesRouter from './src/routes/messages.js';
import uploadRouter from './src/routes/upload.js';
// Use routers
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/reactions', reactionsRouter);
app.use('/friendships', friendshipsRouter);
app.use('/notifications', notificationsRouter);
app.use('/messages', messagesRouter);
app.use('/upload', uploadRouter);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Chat API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
