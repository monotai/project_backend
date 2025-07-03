import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY user_id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  const { firstname, lastname, username, email, phonenumber, password } = req.body;
  try {
    const query = `INSERT INTO users (firstname, lastname, username, email, phonenumber, password, profile_image_url)
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [firstname, lastname, username, email, phonenumber, password];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error or duplicate key' });
  }
});

export default router;
