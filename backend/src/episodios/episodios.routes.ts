import * as episodiosController from "./episodios.controller";
import { Router } from "express";
import { validateBodySchema, validateParamsSchema, validateQuerySchema } from "../middlewares/validateSchema.middleware";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import { QueryEpisodioSchema, UpdateEpisodioSchema, CreateEpisodioSchema, IdSchema } from "./episodios.schema";

const router = Router();
router.get("/api/episodios/:id", validateParamsSchema(IdSchema), requireAuth, episodiosController.getById);
router.get("/api/episodios/:id/assistir", validateParamsSchema(IdSchema), requireAuth, episodiosController.getManifestoEpisodio);
router.get("/api/episodios/serie/:id", validateParamsSchema(IdSchema), validateQuerySchema(QueryEpisodioSchema), requireAuth, episodiosController.getBySerie);
router.post("/api/episodios", validateBodySchema(CreateEpisodioSchema), requireAuth, requireAdmin, episodiosController.create);
router.patch("/api/episodios/:id", validateParamsSchema(IdSchema), validateBodySchema(UpdateEpisodioSchema), requireAuth, requireAdmin, episodiosController.update);
router.delete("/api/episodios/:id", validateParamsSchema(IdSchema), requireAuth, requireAdmin, episodiosController.remove);
export default router;