import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
};

const knexInstance = knex(config);

export default knexInstance;
