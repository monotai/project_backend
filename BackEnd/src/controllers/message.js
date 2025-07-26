import {Message} from '../models/index.js';

class MessageController {
  static async getAll(req, res) {
    try {
      const messages = await Message.findAll();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });
      res.json(message);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const message = await Message.create(req.body);
      res.status(201).json(message);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });
      await message.update(req.body);
      res.json(message);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });
      await message.destroy();
      res.json({ message: 'Message deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default MessageController;
