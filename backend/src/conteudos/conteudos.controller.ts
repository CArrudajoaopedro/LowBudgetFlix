import * as conteudosService from "./conteudos.service"
import { Request, Response, NextFunction } from "express"

export async function getFilteredPaged(req: Request, res: Response, next: NextFunction)
{
    const dto = res.locals.query;
    const conteudos = await conteudosService.getFilteredPaged(dto);
    res.status(200).json(conteudos);
}

export async function getById(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const conteudo = await conteudosService.getById(id);
    res.status(200).json(conteudo);
}

export async function create(req: Request, res: Response, next: NextFunction)
{
    const dto = req.body;
    const conteudo = await conteudosService.create(dto);
    res.status(201).json(conteudo);
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const dto = req.body;
    const conteudo = await conteudosService.update(id, dto);
    res.status(200).json(conteudo);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await conteudosService.remove(id);
    res.status(204).end();
}