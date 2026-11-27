import * as creditosController from "./creditos.controller";
import { Router } from "express";
import { CreateCreditoSchema } from "./creditos.schema";
import { IdSchema, validateBodySchema, validateParamsSchema } from "../middlewares/validateSchema.middleware";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/api/conteudos/:id/creditos", validateParamsSchema(IdSchema), requireAuth, creditosController.getByConteudo);
router.get("/api/artistas/:id/creditos", validateParamsSchema(IdSchema), requireAuth, creditosController.getByArtista);
router.put("/api/conteudos/:id/creditos", validateParamsSchema(IdSchema), validateBodySchema(CreateCreditoSchema), requireAuth, requireAdmin, creditosController.upsert);
router.delete("/api/conteudos/:id/creditos", validateParamsSchema(IdSchema), requireAuth, creditosController.remove);
export default router;