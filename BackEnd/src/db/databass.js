import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite',
    logging: false, // Disable logging for cleaner output
});

export default sequelize;