import * as categoriasService from "./categorias.service";
import { Request, Response, NextFunction } from "express";

export async function getFilteredPaged(req: Request, res: Response, next: NextFunction)
{
    const {nome, skip, limit} = res.locals.query;
    const categorias = await categoriasService.getFilteredPaged(nome, skip, limit);
    res.status(200).json(categorias);
}

export async function getConteudos(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const {skip, limit} = res.locals.query;
    const conteudos = await categoriasService.getConteudos(id, skip, limit);
    res.status(200).json(conteudos);
}

export async function create(req: Request, res: Response, next: NextFunction)
{
    const nome = req.body.nome;
    const categoria = await categoriasService.create(nome);
    res.status(201).json(categoria);
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const nome = req.body.nome;
    const categoria = await categoriasService.update(id, nome);
    res.status(200).json(categoria);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await categoriasService.remove(id);
    res.status(204).end();
}