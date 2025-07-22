import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Friendship extends Model {}

Friendship.init({
  friendship_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id1: { type: DataTypes.INTEGER, allowNull: false },
  user_id2: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'blocked'),
    defaultValue: 'pending'
  }
}, { sequelize, modelName: 'friendships', timestamps: false });

export default Friendship;
