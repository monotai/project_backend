import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
// Import User model (adjust path as needed)
import User from './user.js';

class Post extends Model {
    static associate() {
        // Each post belongs to a user
        Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
    }
}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
    }
);

// Call associate after all models are defined
//Post.associate();

export default Post;