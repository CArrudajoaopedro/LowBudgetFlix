import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import { validateBodySchema } from "../middlewares/validateSchema.middleware";
import {CreateUsuarioSchema, UpdateNomeUsuarioSchema, UpdateSenhaUsuarioSchema} from "./usuarios.entity"
import * as usuariosController from "./usuarios.controller";

const router = Router();
router.post("/api/usuarios/admin", validateBodySchema(CreateUsuarioSchema), requireAuth, requireAdmin, usuariosController.createAdmin);
router.post("/api/usuarios/comum", validateBodySchema(CreateUsuarioSchema), usuariosController.createComum);
router.get("/api/usuarios", requireAuth, requireAdmin, usuariosController.getAll);
router.get("/api/usuarios/me", requireAuth, usuariosController.getMe);
router.get("/api/usuarios/:id", requireAuth, requireAdmin, usuariosController.getById);
router.patch("/api/usuarios/me", validateBodySchema(UpdateNomeUsuarioSchema), requireAuth, usuariosController.update);
router.put("/api/usuarios/me/senha", validateBodySchema(UpdateSenhaUsuarioSchema), requireAuth, usuariosController.updateSenha);
router.delete("/api/usuarios/:id", requireAuth, requireAdmin, usuariosController.remove);
export default router;