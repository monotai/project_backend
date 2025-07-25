import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(req.body);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.update(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.destroy();
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async test(req, res) {
    try {
      const body = req.body;
      res.json(body);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async findByEmail(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }


      if (password && password !== user.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Don't return the password!
      const { password: _pwd, ...safeUser } = user.toJSON();

      res.json(safeUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default UserController;
