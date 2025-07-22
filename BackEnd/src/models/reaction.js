import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Reaction extends Model {}

Reaction.init({
  reaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  post_id: { type: DataTypes.INTEGER },
  comment_id: { type: DataTypes.INTEGER },
  reaction_type: {
    type: DataTypes.ENUM('like', 'love', 'haha', 'wow', 'sad', 'angry'),
    allowNull: false
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'reactions', timestamps: false });

export default Reaction;
