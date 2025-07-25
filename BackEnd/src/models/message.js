import { Model, DataTypes, TableHints } from 'sequelize';
import sequelize from '../db/database.js';

class Message extends Model {}

Message.init({
  message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sender_id: { type: DataTypes.INTEGER, allowNull: false },
  receiver_id: { type: DataTypes.INTEGER, allowNull: false },
  content_text: { type: DataTypes.TEXT },
  content_image_url: { type: DataTypes.STRING },
  content_video_url: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Message', tableName: 'messages', timestamps: false });

export default Message;
