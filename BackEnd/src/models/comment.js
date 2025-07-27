import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Comment extends Model {}

Comment.init({
  comment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  parent_comment_id: { type: DataTypes.INTEGER},
  content_text: { type: DataTypes.TEXT },
  content_image_url: { type: DataTypes.STRING },
  content_video_url: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Comment', tableName: 'comments', timestamps: false });


export default Comment;
