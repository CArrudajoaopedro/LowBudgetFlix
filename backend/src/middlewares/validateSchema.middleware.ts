import {ZodType, ZodError} from "zod"
import { Request, Response, NextFunction } from "express"

export function validateBodySchema(schema: ZodType)
{
    const validateFunction = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            req.body = schema.parse(req.body);
            return next();
        }
        catch (error)
        {
            if (error instanceof ZodError)
            {
                return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
            }
            else
            {
                next(error);
            }
        }
    }
    return validateFunction;
}