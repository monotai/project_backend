import express from 'express';
import pool from '../db/index.js'; // Adjust the path as necessary
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE post_id = $1', [postId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create new post
router.post('/', async (req, res) => {
  const { user_id, content_text, content_image_url, content_video_url } = req.body;
  try {
    const query = `
      INSERT INTO posts (user_id, content_text, content_image_url, content_video_url)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user_id, content_text, content_image_url, content_video_url];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const { content_text, content_image_url, content_video_url } = req.body;
  try {
    const query = `
      UPDATE posts SET content_text=$1, content_image_url=$2, content_video_url=$3
      WHERE post_id=$4 RETURNING *`;
    const values = [content_text, content_image_url, content_video_url, postId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM posts WHERE post_id = $1 RETURNING *', [postId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
