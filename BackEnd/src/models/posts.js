
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Post extends Model {}

// Initialize the Post model
Post.init(
  {
    // Primary key for the post
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Title of the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Main content or body of the post
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Foreign key User who created the post
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  }
);

// Export the model so it can be used in controllers/routes
export default Post;
