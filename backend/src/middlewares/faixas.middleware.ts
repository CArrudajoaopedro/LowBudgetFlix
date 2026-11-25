import { TipoFaixa } from "../faixas/faixas.entity";
import { Request, Response, NextFunction } from "express";

export function insertTipo(tipo: TipoFaixa)
{
    const func = async (req: Request, res: Response, next: NextFunction) => {
        req.body = {...req.body, tipo: tipo};
        return next();
    }
    return func;
}