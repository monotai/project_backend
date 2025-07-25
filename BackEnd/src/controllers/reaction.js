import {Reaction} from '../models/index.js';

class ReactionController {
  static async getAll(req, res) {
    try {
      const reactions = await Reaction.findAll();
      res.json(reactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const reaction = await Reaction.findByPk(req.params.id);
      if (!reaction) return res.status(404).json({ error: 'Reaction not found' });
      res.json(reaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      res.status(201).json(reaction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const reaction = await Reaction.findByPk(req.params.id);
      if (!reaction) return res.status(404).json({ error: 'Reaction not found' });
      await reaction.update(req.body);
      res.json(reaction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const reaction = await Reaction.findByPk(req.params.id);
      if (!reaction) return res.status(404).json({ error: 'Reaction not found' });
      await reaction.destroy();
      res.json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ReactionController;
