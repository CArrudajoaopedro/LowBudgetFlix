import { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ForbiddenError } from "../errors/AppErrors";
import { getById } from "../usuarios/usuarios.service";
import * as authService from "../auth/auth.service";

export async function requireAuth(req: Request, res: Response, next: NextFunction)
{
    const authHeader = req.headers.authorization;
    if (!authHeader)
    {
        throw new UnauthorizedError("Não autenticado.");
    }
    const [, token] = authHeader.split(" ");
    req.user = authService.authenticate(token);
    return next()
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction)
{
    const usuario = await getById(req.user!.id);
    if (!usuario.flag_administrador)
    {
        throw new ForbiddenError("Requer privilégios de administrador.");
    }
    return next();
}