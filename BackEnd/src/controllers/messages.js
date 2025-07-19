class messageController {
  constructor(messageService) {
    this.messageService = messageService;
  }

  async getMessages(req, res) {
    try {
      const messages = await this.messageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  }

  async createMessage(req, res) {
    try {
      const newMessage = await this.messageService.createMessage(req.body);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  }

    async updateMessage(req, res) {
        try {
        const updatedMessage = await this.messageService.updateMessage(req.params.id, req.body);
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(updatedMessage);
        } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
        }
    }

    async deleteMessage(req, res) {
        try {
        const deletedMessage = await this.messageService.deleteMessage(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
        }
    }
}