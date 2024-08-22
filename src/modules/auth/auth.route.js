import { Router } from "express";

import { login,register } from "./index.js";

export const router = Router();

router.post("/login", async (req, res) => {
    const data = await login(req.body);
    res.status(200).json({data});
})// loga um usuario

router.post("/register", async (req, res) => {
    const data = await register(req.body);
    res.status(200).json({data});
})// cria um novo usuario com email e senha encriptada


export default router;