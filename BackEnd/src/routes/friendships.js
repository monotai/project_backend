import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get friendships for a user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `SELECT * FROM friendships
       WHERE user_id1 = $1 OR user_id2 = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create friendship request
router.post('/', async (req, res) => {
  const { user_id1, user_id2, status } = req.body;
  if (user_id1 === user_id2) return res.status(400).json({ error: 'Cannot friend yourself' });

  try {
    const query = `
      INSERT INTO friendships (user_id1, user_id2, status)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [user_id1, user_id2, status || 'pending'];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error or duplicate friendship' });
  }
});

// Update friendship status
router.put('/:id', async (req, res) => {
  const friendshipId = req.params.id;
  const { status } = req.body;
  try {
    const query = `
      UPDATE friendships SET status = $1
      WHERE friendship_id = $2 RETURNING *`;
    const values = [status, friendshipId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Friendship not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete friendship
router.delete('/:id', async (req, res) => {
  const friendshipId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM friendships WHERE friendship_id = $1 RETURNING *', [friendshipId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Friendship not found' });
    res.json({ message: 'Friendship deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;