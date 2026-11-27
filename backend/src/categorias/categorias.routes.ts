import * as categoriasController from "./categorias.controller";
import { QueryCategoriaSchema, CreateCategoriaSchema, UpdateCategoriaSchema, QueryConteudosCategoriaSchema } from "./categorias.schema";
import { validateBodySchema, validateParamsSchema, validateQuerySchema, IdSchema } from "../middlewares/validateSchema.middleware";
import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware";

const router = Router();
router.get("/api/categorias", validateQuerySchema(QueryCategoriaSchema), requireAuth, categoriasController.getFilteredPaged);
router.get("/api/categorias/:id/conteudos", validateParamsSchema(IdSchema), validateQuerySchema(QueryConteudosCategoriaSchema), requireAuth, categoriasController.getConteudos);
router.post("/api/categorias", validateBodySchema(CreateCategoriaSchema), requireAuth, requireAdmin, categoriasController.create);
router.patch("/api/categorias/:id", validateParamsSchema(IdSchema), validateBodySchema(UpdateCategoriaSchema), requireAuth, requireAdmin, categoriasController.update);
router.delete("/api/categorias/:id", validateParamsSchema(IdSchema), requireAuth, requireAdmin, categoriasController.remove);
export default router;