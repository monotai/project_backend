import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Notification extends Model {}

Notification.init({
  notification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  post_id: { type: DataTypes.INTEGER },
  share_id: { type: DataTypes.INTEGER },
  comment_id: { type: DataTypes.INTEGER },
  message_id: { type: DataTypes.INTEGER },
  content: { type: DataTypes.TEXT },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Notification', tableName: 'notifications', timestamps: false });

export default Notification;
