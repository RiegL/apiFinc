import { Router } from "express";

import { login, register } from "./index.js";

export const router = Router();

router.post("/login", async (req, res) => {
  const data = await login(req.body);
  if (data.error) {
    res.status(403).json({ error: data.error });
    return;
  }
  return res.status(200).json({data});
}); // loga um usuario

router.post("/register", async (req, res) => {
  const data = await register(req.body);
  if (data.error) {
    res.status(400).json({ error: data.error });
    return;
  }
  return res.status(200).json({ data });
}); // cria um novo usuario com email e senha encriptada

export default router;
