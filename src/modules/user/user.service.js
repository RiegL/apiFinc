import jwt from "jsonwebtoken";

export const getMe = async (token) => {
    const isValid = jwt.verify(token, process.env.JWT_SECRET); //cria o token
    console.log('token',token)
    return isValid;
}