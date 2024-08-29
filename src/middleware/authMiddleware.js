import jwt from 'jsonwebtoken';
import { getById } from '../modules/user/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verificado:", isValid);

    const user = await getById(isValid.id);
    console.log("Usuário encontrado:", user);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error.message);
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
