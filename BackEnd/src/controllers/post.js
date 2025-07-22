import Post from '../models/Post.js';

class PostController {
  static async getAll(req, res) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      await post.update(req.body);
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      await post.destroy();
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default PostController;
