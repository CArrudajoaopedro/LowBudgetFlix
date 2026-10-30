import { Router } from "express";
import { UsuarioLoginSchema } from "../usuarios/usuarios.entity";
import { validateBodySchema } from "../middlewares/validateSchema.middleware";
import * as authController from "./auth.controller"

const router = Router();
router.post("/api/auth/login", validateBodySchema(UsuarioLoginSchema), authController.login);
export default router;