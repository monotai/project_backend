import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js'; 

// Define the Reaction model class
class Reaction extends Model {}

// Initialize the Reaction model
Reaction.init(
  {
    // Primary key for each reaction
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // Type of reaction 
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign key: user who reacted
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,              
    modelName: 'Reaction',   
    tableName: 'reactions',  
    timestamps: true,        
  }
);

export default Reaction;
