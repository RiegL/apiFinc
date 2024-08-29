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
  
    const categoriaData = {
      nome: req.body.nome,
      user_id: req.user.id // Adiciona o user_id do middleware
    };
  
    console.log("Criando uma nova categoria com:", categoriaData);
  
    try {
      // Verifique o retorno da função create
      const [data] = await create(categoriaData);
      res.status(201).json({ data });
    } catch (error) {
      console.error("Erro ao criar categoria:", error.message);
      res.status(500).json({ message: "Erro ao criar categoria" });
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