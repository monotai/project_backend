class friendshipController {
  constructor(friendshipService) {
    this.friendshipService = friendshipService;
  }

  async createFriendship(req, res) {
    try {
      const { userId, friendId } = req.body;
      const friendship = await this.friendshipService.create(userId, friendId);
      res.status(201).json(friendship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a specific friendship
  async getFriendship(req, res) {
    try {
      const { userId, friendId } = req.params;
      const friendship = await this.friendshipService.getByUserAndFriendId(userId, friendId);
      if (!friendship) {
        return res.status(404).json({ error: 'Friendship not found' });
      }
      res.status(200).json(friendship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a specific friendship
  async deleteFriendship(req, res) {
    try {
      const { userId, friendId } = req.params;
      await this.friendshipService.delete(userId, friendId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFriendships(req, res) {
    try {
      const { userId } = req.params;
      const friendships = await this.friendshipService.getByUserId(userId);
      res.status(200).json(friendships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
}   