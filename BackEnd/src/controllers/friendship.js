import Friendship from '../models/Friendship.js';

class FriendshipController {
  static async getAll(req, res) {
    try {
      const friendships = await Friendship.findAll();
      res.json(friendships);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const friendship = await Friendship.findByPk(req.params.id);
      if (!friendship) return res.status(404).json({ error: 'Friendship not found' });
      res.json(friendship);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const friendship = await Friendship.create(req.body);
      res.status(201).json(friendship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const friendship = await Friendship.findByPk(req.params.id);
      if (!friendship) return res.status(404).json({ error: 'Friendship not found' });
      await friendship.update(req.body);
      res.json(friendship);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const friendship = await Friendship.findByPk(req.params.id);
      if (!friendship) return res.status(404).json({ error: 'Friendship not found' });
      await friendship.destroy();
      res.json({ message: 'Friendship deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default FriendshipController;
