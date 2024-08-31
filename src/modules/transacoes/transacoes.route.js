import { Router } from "express";
import { getAll, getById , create ,update, remove} from "./index.js";
import {authMiddleware} from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware , async (req, res) => {
    const data = await getAll(req.user.id);
    res.status(200).json({data});
})

router.get("/:id", authMiddleware, async (req, res) => {
    const data = await getById(req.params.id, req.user.id);
    res.status(200).json({data});
})

router.post("/", authMiddleware, async (req, res) => {
    // Verifique se req.user está corretamente definido
    console.log("User no Middleware:", req.user);
  
    const metaData = {
      descricao: req.body.descricao,
      valor: req.body.valor,
      data: req.body.data || null,
      tipo: req.body.tipo,
      categoria_id: req.body.categoria_id,
      user_id: req.user.id 
    };
    try {
      // Verifique o retorno da função create
      const [data] = await create(metaData);
      res.status(201).json({ data });
    } catch (error) {
      console.error("Erro ao criar metas:", error.message);
      res.status(500).json({ message: "Erro ao criar meta" });
    }
  });
  

router.put("/:id",authMiddleware, async (req, res) => {
    req.body.user_id = req.user.id;
    const data = await update(req.params.id, req.body, req.user.id);
    res.status(200).json({data});
})

router.delete("/:id",authMiddleware, async (req, res) => {
    // req.body.user_id = req.user.id;
    const data = await remove(req.params.id,req.user.id);
    res.status(200).json({data});
})


export default router;