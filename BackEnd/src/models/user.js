import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class User extends Model {}

User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phonenumber: { type: DataTypes.STRING, unique: true},
  password: { type: DataTypes.STRING, allowNull: false },
  profile_image_url: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'banned'),
    defaultValue: 'active',
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'User', tableName: 'users', timestamps: false });

export default User;
