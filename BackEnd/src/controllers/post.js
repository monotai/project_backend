import {Post, Reaction} from '../models/index.js';

class PostController {
  static async getAll(_req, res) {
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
      const reactions = await Reaction.destroy({ where: { post_id: post.post_id } });
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async reaction(req, res) {
  try {
    const { post_id, user_id, reaction_type } = req.body;

    const post = await Post.findByPk(post_id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const existingReaction = await Reaction.findOne({ where: { post_id: post_id, user_id: user_id } });

    // CASE 1: User clicks same reaction again — remove it
    if (existingReaction && existingReaction.reaction_type === reaction_type) {
      await existingReaction.destroy();

        // Safely decrement
        const current = post[`${reaction_type}_count`] || 0;
        post[`${reaction_type}_count`] = Math.max(0, current - 1);
      }

      // CASE 2: User changes reaction
      else if (existingReaction) {
        const oldType = existingReaction.reaction_type;

        await existingReaction.update({ reaction_type: reaction_type });

        // Decrement old
        const currentOld = post[`${oldType}_count`] || 0;
        post[`${oldType}_count`] = Math.max(0, currentOld - 1);

        // Increment new
        const currentNew = post[`${reaction_type}_count`] || 0;
        post[`${reaction_type}_count`] = currentNew + 1;
      }

      // CASE 3: New reaction
      else {
        await Reaction.create({ post_id: post_id, user_id: user_id, reaction_type: reaction_type });

        const current = post[`${reaction_type}_count`] || 0;
        post[`${reaction_type}_count`] = current + 1;
      }

      await post.save();

      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default PostController;
