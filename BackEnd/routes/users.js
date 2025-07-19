import express from 'express';
import pool from '../src/db/index.js'; // Adjust the path if needed

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY user_id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching user with ID ${userId}:`, err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    phonenumber,
    password,
    profile_image_url
  } = req.body;
   
  try {
    const query = `
      INSERT INTO users (firstname, lastname, username, email, phonenumber, password, profile_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

    const values = [
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      password,
      profile_image_url
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    
    // Enhanced error reporting
    if (err.code === '23505') {
      // PostgreSQL unique_violation
      return res.status(409).json({ error: 'Username, email, or phone number already exists' });
    }

    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
