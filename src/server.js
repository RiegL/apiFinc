import express from 'express';
import dotenv from 'dotenv';
import knex from './config/database.js';
import cors from 'cors';
import bearerToken from 'express-bearer-token';
dotenv.config();
import userRouter from './modules/user/user.route.js';   // rotas para usuários
import authRouter from './modules/auth/auth.route.js'; // rotas para auth
import categoriaRouter from './modules/categorias/categoria.route.js'; // rotas para categorias
import metaRouter from './modules/metas/metas.route.js'; // rotas para categorias
import transacoesRouter from './modules/transacoes/transacoes.route.js'; // rotas para categorias

const app = express();

app.use(express.json());
app.use(cors());//  para permitir cross-origin requests
app.use(bearerToken());//  para validar tokens    

app.use('/users', userRouter); //usando rotas para usuários
app.use('/auth', authRouter); // usando rotas para auth
app.use('/categorias', categoriaRouter); // usando rotas para categorias
app.use('/metas', metaRouter); // usando rotas para metas
app.use('/transacoes', transacoesRouter); // usando rotas para transacoes

app.listen(8080, async () => {
    try {
        await knex.raw('SELECT 1+1 AS result');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed', err);
    }
    console.log('Server running on port 8080');
});
