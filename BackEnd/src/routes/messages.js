import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get messages between two users (simple example)
router.get('/between/:user1/:user2', async (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;
  try {
    const query = `
      SELECT * FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC`;
    const result = await pool.query(query, [user1, user2]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Send a message
router.post('/', async (req, res) => {
  const { sender_id, receiver_id, content_text, content_image_url, content_video_url } = req.body;
  try {
    const query = `
      INSERT INTO messages (sender_id, receiver_id, content_text, content_image_url, content_video_url)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [sender_id, receiver_id, content_text, content_image_url, content_video_url];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM messages WHERE message_id = $1 RETURNING *', [messageId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;