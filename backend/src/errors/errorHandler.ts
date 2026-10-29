import {Request, Response, NextFunction} from "express"
import { AppError } from "./AppErrors";


export function errorHandler
(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
)
{
    console.error("LOG INTERNO DO SERVIDOR: ", err)
    if (err instanceof AppError)
    {
        return res.status(err.statusCode).json(
            {
                error: {
                    code: err.code,
                    message: err.message,
                }
            },
        );
    }
    return res.status(500).json(
        {
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Ocorreu um erro inesperado no servidor.",
            },
        },
    );
}