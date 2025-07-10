import express from 'express';// PostgreSQL connection pool
const router = express.Router();

// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
      [postId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get comment by ID
router.get('/:id', async (req, res) => {
  const commentId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM comments WHERE comment_id = $1', [commentId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create comment
router.post('/', async (req, res) => {
  const { post_id, user_id, parent_comment_id, content_text, content_image_url, content_video_url } = req.body;
  try {
    const query = `
      INSERT INTO comments (post_id, user_id, parent_comment_id, content_text, content_image_url, content_video_url)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [post_id, user_id, parent_comment_id || null, content_text, content_image_url, content_video_url];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update comment
router.put('/:id', async (req, res) => {
  const commentId = req.params.id;
  const { content_text, content_image_url, content_video_url } = req.body;
  try {
    const query = `
      UPDATE comments SET content_text=$1, content_image_url=$2, content_video_url=$3
      WHERE comment_id=$4 RETURNING *`;
    const values = [content_text, content_image_url, content_video_url, commentId];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  const commentId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [commentId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
