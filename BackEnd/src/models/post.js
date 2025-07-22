import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Post extends Model {}

Post.init({
  post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  content_text: { type: DataTypes.TEXT },
  content_image_url: { type: DataTypes.STRING },
  content_video_url: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, modelName: 'posts', timestamps: false });

export default Post;
