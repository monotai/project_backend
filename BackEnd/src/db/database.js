import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './backend/src/db/database.db',
    logging: false, // Disable logging for cleaner output
});

export default sequelize;