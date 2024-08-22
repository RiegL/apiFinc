import express from 'express';
import dotenv from 'dotenv';
import knex from './config/database.js';
import cors from 'cors';
dotenv.config();
import userRouter from './modules/user/user.route.js';   
import authRouter from './modules/auth/auth.route.js'; 


const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(8080, async () => {
    try {
        await knex.raw('SELECT 1+1 AS result');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed', err);
    }
    console.log('Server running on port 8080');
});
