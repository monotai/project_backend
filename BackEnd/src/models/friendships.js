import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

class Friendship extends Model {}

Friendship.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        friendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Friendship',
        tableName: 'friendships',
        timestamps: true,
    }
);
Friendship.associate = function(models) {
    Friendship.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Friendship.belongsTo(models.User, { as: 'friend', foreignKey: 'friendId' });
};
export default Friendship;






