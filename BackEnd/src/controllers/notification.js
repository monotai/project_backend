import Notification from '../models/Notification.js';

class NotificationController {
  static async getAll(req, res) {
    try {
      const notifications = await Notification.findAll();
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const notification = await Notification.findByPk(req.params.id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      res.json(notification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const notification = await Notification.findByPk(req.params.id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      await notification.update(req.body);
      res.json(notification);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const notification = await Notification.findByPk(req.params.id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      await notification.destroy();
      res.json({ message: 'Notification deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default NotificationController;
