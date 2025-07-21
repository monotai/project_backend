import { commentsService } from '../services/commentsService.js';
import express from 'express';
import { commentsController } from '../controllers/commentsController.js';
const router = express.Router();    

class commentsController {
  constructor(commentsService) {
    this.commentsService = commentsService;
  }

  // Get all comments
  async getAllComments(req, res) {
    try {
      const comments = await this.commentsService.getComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve comments' });
    }
  }

  // Get a single comment by ID
  async getComment(req, res) {
    try {
      const comment = await this.commentsService.getComment(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve comment' });
    }
  }

  // Add a comment
  async addComment(req, res) {
    try {
      const newComment = await this.commentsService.addComment(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  }

  // Update a comment
  async updateComment(req, res) {
    try {
      const updatedComment = await this.commentsService.updateComment(req.params.id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update comment' });
    }
  }

  // Delete a comment
  async deleteComment(req, res) {
    try {
      const deletedComment = await this.commentsService.deleteComment(req.params.id);
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
}