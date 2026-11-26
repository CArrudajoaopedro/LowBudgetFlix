import * as artistasController from "./artistas.controller";
import { QueryArtistaSchema, CreateArtistaSchema, UpdateArtistaSchema } from "./artistas.schema";
import { validateBodySchema, validateParamsSchema, validateQuerySchema, IdSchema } from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/api/artistas", validateQuerySchema(QueryArtistaSchema), requireAuth, artistasController.getFilteredPaged);
router.post("/api/artistas", validateBodySchema(CreateArtistaSchema), requireAuth, requireAdmin, artistasController.create);
router.patch("/api/artistas/:id", validateParamsSchema(IdSchema), validateBodySchema(UpdateArtistaSchema), requireAuth, requireAdmin, artistasController.update);
router.delete("/api/artistas/:id", validateParamsSchema(IdSchema), requireAuth, requireAdmin, artistasController.remove);
export default router;