import * as artistasService from "./artistas.service";
import { Request, Response, NextFunction } from "express";

export async function getFilteredPaged(req: Request, res: Response, next: NextFunction)
{
    const {nome, skip, limit} = res.locals.query;
    const artistas = await artistasService.getFilteredPaged(nome, skip, limit);
    res.status(200).json(artistas);
}

export async function create(req: Request, res: Response, next: NextFunction)
{
    const dto = req.body;
    const artista = await artistasService.create(dto);
    res.status(201).json(artista);
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const dto = req.body;
    const artista = await artistasService.update(id, dto);
    res.status(200).json(artista);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await artistasService.remove(id);
    res.status(204).end();
}