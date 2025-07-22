import Share from '../models/share.js';

class ShareController {
  static async getAll(req, res) {
    try {
      const shares = await Share.findAll();
      res.json(shares);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const share = await Share.findByPk(req.params.id);
      if (!share) return res.status(404).json({ error: 'Share not found' });
      res.json(share);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const share = await Share.create(req.body);
      res.status(201).json(share);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const share = await Share.findByPk(req.params.id);
      if (!share) return res.status(404).json({ error: 'Share not found' });
      await share.update(req.body);
      res.json(share);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const share = await Share.findByPk(req.params.id);
      if (!share) return res.status(404).json({ error: 'Share not found' });
      await share.destroy();
      res.json({ message: 'Share deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ShareController;
