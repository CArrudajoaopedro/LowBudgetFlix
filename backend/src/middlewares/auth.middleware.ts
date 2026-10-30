import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/AppErrors";
import * as authService from "../auth/auth.service";

export async function requireAuth(req: Request, res: Response, next: NextFunction)
{
    const authHeader = req.headers.authorization;
    if (!authHeader)
    {
        throw new UnauthorizedError("Não autenticado.");
    }
    const [, token] = authHeader.split(" ");
    //req.user = authService.authenticate(token);
}