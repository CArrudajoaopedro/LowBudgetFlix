import * as historicoController from "./historico_visualizacao.controller";
import { Router } from "express";
import { UpsertHistoricoSchema } from "./historico_visualizacao.schema";
import { IdSchema, validateBodySchema, validateParamsSchema, validateQuerySchema } from "../middlewares/validateSchema.middleware";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";

const router = Router();
router.put("/api/conteudos/:id/historico", validateParamsSchema(IdSchema), validateBodySchema(UpsertHistoricoSchema), requireAuth, historicoController.upsertByConteudo);
router.put("/api/episodios/:id/historico", validateParamsSchema(IdSchema), validateBodySchema(UpsertHistoricoSchema), requireAuth, historicoController.upsertByEpisodio);
router.delete("/api/historico/:id", validateParamsSchema(IdSchema), requireAuth, requireAdmin, historicoController.remove);
export default router;