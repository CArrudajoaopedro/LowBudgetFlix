import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

export async function login(req: Request, res: Response, next: NextFunction)
{
    const token = await authService.login(req.body.email, req.body.senha);
    res.status(200).json({token: token});
}