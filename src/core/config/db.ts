
import { Sequelize } from 'sequelize';
import { config } from './obj';


// Postgres implementation
export const sequelize = new Sequelize(
    config.dbName,
    config.pgUSER,
    config.pgPassword,
    {
        port: 5432,
        host: config.dbHost,
        dialect: 'postgres',
    }
);