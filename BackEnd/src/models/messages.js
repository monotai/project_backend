import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
class Message extends Model {}

Message.init(
  {
 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize,            
    modelName: 'Message', 
    tableName: 'messages',
    timestamps: false,    
  }
);


export default Message;
