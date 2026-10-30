import { Router } from "express";
import * as usuariosController from "./usuarios.controller";

const router = Router();
router.post("/api/usuarios/admin", usuariosController.createAdmin);
router.post("/api/usuarios/comum", usuariosController.createComum);
router.get("/api/usuarios", usuariosController.getAll);
router.get("/api/usuarios/:id", usuariosController.getById);
router.patch("/api/usuarios/:id", usuariosController.update);
router.put("/api/usuarios/:id/senha", usuariosController.updateSenha);
router.delete("/api/usuarios/:id", usuariosController.remove);
export default router;