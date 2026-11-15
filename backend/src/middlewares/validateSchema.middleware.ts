import {ZodType, ZodError} from "zod"
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
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

export function validateParamsSchema(schema: ZodType)
{
    const validateFunction = async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            req.params = schema.parse(req.params) as ParamsDictionary;
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
            req.query = schema.parse(req.query) as ParsedQs;
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