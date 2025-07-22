import express from "express";
const router = express.Router();
import pool from "../db/index.js";
import commentsController from "../controllers/comment.js";

// Get all comments for a post
router.get("/post/:postId", commentsController.getAll);

// Get comment by ID
router.get("/:id", commentsController.getById);

// Create comment
router.post("/", commentsController.create);

// Update comment
router.put("/:id", commentsController.update);

// Delete comment
router.delete("/:id", commentsController.delete);

export default router;
