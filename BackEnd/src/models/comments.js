
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import User from './users.js'; 
import Post from './posts.js'; 

class Comments extends Model {}

// Initialize the Comments model with its table structure
Comments.init(
  {
    // Primary key ID for each comment
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Actual comment content
    text: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Comments', 
    tableName: 'comments', 
    timestamps: true,
  }
);


Comments.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE', 
});

// Each comment belongs to one post
Comments.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post',
  onDelete: 'CASCADE', 
});
export default Comments;
