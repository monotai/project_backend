import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get notifications for user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create notification
router.post('/', async (req, res) => {
  const { user_id, content, is_read } = req.body;
  try {
    const query = `
      INSERT INTO notifications (user_id, content, is_read)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [user_id, content, is_read || false];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  const notificationId = req.params.id;
  try {
    const query = `
      UPDATE notifications SET is_read = true
      WHERE notification_id = $1 RETURNING *`;
    const result = await pool.query(query, [notificationId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Notification not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  const notificationId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM notifications WHERE notification_id = $1 RETURNING *', [notificationId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
