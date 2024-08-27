import jwt from 'jsonwebtoken';
import  { getById } from '../modules/user/index.js';

export const authMiddleware = async (req, res, next) => {

    try {
        const isValid = jwt.verify(req.token, process.env.JWT_SECRET); //cria o token
        const user = await getById(isValid.id);//busca o usuario pelo id do token
        req.user = user;//armazena o usuario na requisição
        next();//continua a requisição
    } catch (error) {
        return  res.status(403).json({ message: "Token inválido" });//retorna um erro se o token for inválido
    }


}

export default authMiddleware;