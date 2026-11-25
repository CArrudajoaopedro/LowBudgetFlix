import {ZodType, ZodError, object, coerce} from "zod"
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Request, Response, NextFunction } from "express"

export const IdSchema = object({
    id: coerce.number().int()
})
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

export function validateParamsSchema(schema: ZodType)
{
    const validateFunction = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            res.locals.params = schema.parse(req.params);
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

export function validateQuerySchema(schema: ZodType)
{
    const validateFunction = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            res.locals.query = schema.parse(req.query);
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