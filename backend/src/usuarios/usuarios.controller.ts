import {Request, Response, NextFunction} from "express";
import * as z from "zod"
import * as usuarioService from "./usuarios.service";
import * as usuariosEntity from "./usuarios.entity"
import * as appErrors from "../errors/AppErrors";

export async function createComum(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const dto = usuariosEntity.CreateUsuarioSchema.parse(req.body);
        const usuario = await usuarioService.create(dto, false);
        res.status(201).json(usuario);
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}
export async function createAdmin(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const dto = usuariosEntity.CreateUsuarioSchema.parse(req.body);
        const usuario = await usuarioService.create(dto, true);
        res.status(201).json(usuario);
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}
export async function getById(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const id = z.coerce.number().int().parse(req.params.id);
        const usuario = await usuarioService.getById(id);
        res.status(200).json(usuario);
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}
export async function getAll(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const usuarios = await usuarioService.getAll();
        res.status(200).json(usuarios);
    }
    catch (error)
    {
        next(error);
    }
}
export async function updateNome(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const id = z.coerce.number().int().parse(req.params.id);
        const dto = usuariosEntity.UpdateNomeUsuarioSchema.parse(req.body);
        const usuario = await usuarioService.updateNome(dto.nome, id);
        res.status(200).json(usuario);
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}
export async function updateSenha(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const id = z.coerce.number().int().parse(req.params.id);
        const dto = usuariosEntity.UpdateSenhaUsuarioSchema.parse(req.body);
        const usuario = await usuarioService.updateSenha(dto.senha, id);
        res.status(200).json(usuario);
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}
export async function remove(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const id = z.coerce.number().int().parse(req.params.id);
        await usuarioService.remove(id);
        res.status(204).end();
    }
    catch (error)
    {
        if (error instanceof z.ZodError)
        {
            return res.status(400).json({ errors: error.flatten((val) => val).fieldErrors });
        }
        else
        {
            next(error);
        }
    }
}