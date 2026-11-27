import * as avaliacoesController from "./avaliacoes.controller";
import { Router } from "express";
import { CreateAvaliacaoSchema } from "./avaliacoes.schema";
import { IdSchema, validateBodySchema, validateParamsSchema } from "../middlewares/validateSchema.middleware";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/api/conteudos/:id/avaliacoes", validateParamsSchema(IdSchema), requireAuth, avaliacoesController.getEstatisticas);
router.put("/api/conteudos/:id/avaliacoes", validateParamsSchema(IdSchema), validateBodySchema(CreateAvaliacaoSchema), requireAuth, avaliacoesController.upsert);
router.delete("/api/conteudos/:id/avaliacoes", validateParamsSchema(IdSchema), requireAuth, avaliacoesController.remove);
export default router;