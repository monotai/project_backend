import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Share extends Model {}

Share.init({
  share_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  caption: { type: DataTypes.STRING },
  share_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'Share', tableName: 'shares', timestamps: false });

export default Share;
