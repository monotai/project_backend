let reactions = []; // Simulated database

class reactionsController {
  static async addReaction(req, res) {
    try {
      const { userId, postId, type } = req.body;
      const reaction = { id: reactions.length + 1, userId, postId, type };
      reactions.push(reaction);
      res.status(201).json({ message: 'Reaction added successfully', reaction });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add reaction' });
    }
  }

  static async removeReaction(req, res) {
    try {
      const { id } = req.params;
      const index = reactions.findIndex(r => r.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      reactions.splice(index, 1);
      res.status(200).json({ message: 'Reaction removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove reaction' });
    }
  }

  static async getReactions(req, res) {
    try {
      res.status(200).json(reactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve reactions' });
    }
  }

  static async deleteReaction(req, res) {
    try {
      const { id } = req.params;
      const index = reactions.findIndex(r => r.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
      reactions.splice(index, 1);
      res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete reaction' });
    }
  }
}

module.exports = reactionsController;