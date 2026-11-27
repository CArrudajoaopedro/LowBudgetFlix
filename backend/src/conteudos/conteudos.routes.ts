import * as conteudosController from "./conteudos.controller"
import { Router } from "express"
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import { CreateConteudoSchema, UpdateConteudoSchema, QueryConteudoSchema, IdSchema } from "./conteudos.schema"
import { validateBodySchema, validateParamsSchema, validateQuerySchema } from "../middlewares/validateSchema.middleware"

const router = Router();
router.get("/api/conteudos", validateQuerySchema(QueryConteudoSchema), requireAuth, conteudosController.getFilteredPaged);
router.get("/api/conteudos/:id", validateParamsSchema(IdSchema), requireAuth, conteudosController.getById);
router.get("/api/conteudos/:id/assistir", validateParamsSchema(IdSchema), requireAuth, conteudosController.getManifestoFilme);
router.post("/api/conteudos", validateBodySchema(CreateConteudoSchema), requireAuth, requireAdmin, conteudosController.create);
router.patch("/api/conteudos/:id", validateParamsSchema(IdSchema), validateBodySchema(UpdateConteudoSchema), requireAuth, requireAdmin, conteudosController.update);
router.delete("/api/conteudos/:id", validateParamsSchema(IdSchema), requireAuth, requireAdmin, conteudosController.remove);
export default router;

