import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get reactions by target (type + id)
router.get('/:target_type/:target_id', async (req, res) => {
  const { target_type, target_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM reactions WHERE target_type = $1 AND target_id = $2 ORDER BY created_at DESC',
      [target_type, target_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create reaction
router.post('/', async (req, res) => {
  const { target_type, target_id, user_id, reaction_type } = req.body;
  try {
    const query = `
      INSERT INTO reactions (target_type, target_id, user_id, reaction_type)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [target_type, target_id, user_id, reaction_type];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error or invalid reaction_type' });
  }
});

// Delete reaction by ID
router.delete('/:id', async (req, res) => {
  const reactionId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM reactions WHERE reaction_id = $1 RETURNING *', [reactionId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Reaction not found' });
    res.json({ message: 'Reaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
