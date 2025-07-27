import {Comment} from '../models/index.js';

class CommentController {
  static async getAll(req, res) {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      res.json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      await comment.update(req.body);
      res.json(comment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      await comment.destroy();
      res.json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default CommentController;
