import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Post extends Model {}

Post.init({
  post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  content_text: { type: DataTypes.TEXT },
  content_file_url: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  like_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  love_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  haha_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  wow_count:  { type: DataTypes.INTEGER, defaultValue: 0 },
  sad_count:  { type: DataTypes.INTEGER, defaultValue: 0 },
  angry_count:{ type: DataTypes.INTEGER, defaultValue: 0 },
}, { sequelize, modelName: 'Post', tableName: 'posts', timestamps: false });

export default Post;
