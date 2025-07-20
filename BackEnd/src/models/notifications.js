
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

// Define the Notification model class
class Notification extends Model {}
Notification.init(
  {
    // Unique ID for each notification
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // The message/content of the notification
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign key the user to whom the notification belongs
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Whether the notification has been read or not
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,         // Adds createdAt and updatedAt
  }
);

export default Notification;
