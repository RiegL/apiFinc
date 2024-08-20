import express from 'express';
import dotenv from 'dotenv';
import knex from './config/database.js';
dotenv.config();
import useRoute from './modules/user/user.route.js';   
const app = express();
app.use(express.json());

app.use('/users', useRoute);

app.listen(8080, async () => {
    try {
        await knex.raw('SELECT 1+1 AS result');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed', err);
    }
    console.log('Server running on port 8080');
});
