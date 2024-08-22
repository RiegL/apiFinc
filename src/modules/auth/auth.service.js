import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { create , getByEmail} from "../user/index.js";

export const login = async (params) => {
  const user = await getByEmail(params.email);
  if (!user) {
    return { error: "Invalid e-mail or password" };
  }

  const passwordCorrect = bcrypt.compareSync(params.password, user.password);
  if (!passwordCorrect) {
    return { error: "Invalid e-mail or password" };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return { token };
};// loga um usuario

export const register = async (params) => {
    const user = await getByEmail(params.email);
    if (user) {
      return { error: "This e-mail already exists" };
    }

    const userCreated = await create(params);

    const token = jwt.sign({ id: userCreated[0] }, process.env.JWT_SECRET);
    return { token };
};// cria um novo usuario com email e senha encriptada
