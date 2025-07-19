    import { Model, DataTypes } from 'sequelize';
    import sequelize from '../config/database.js';
    import User from './user.js'; // Adjust path as needed
    import Post from './post.js'; // Adjust path as needed

    class Comments extends Model {}

    Comments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
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
            modelName: 'Comments',
            tableName: 'comments',
            timestamps: true,
        }
    );

    // Associations
    Comments.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Comments.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

    export default Comments;