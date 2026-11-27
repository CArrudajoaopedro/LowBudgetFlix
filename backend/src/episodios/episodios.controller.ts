import * as episodiosService from "./episodios.service";
import { Request, Response, NextFunction } from "express";

export async function getById(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const episodio = await episodiosService.getById(id);
    res.status(200).json(episodio);
}

export async function getBySerie(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const query = res.locals.query;
    const episodios = await episodiosService.getBySerie(id, query);
    res.status(200).json(episodios);
}

export async function getManifestoEpisodio(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    const payload = await episodiosService.getManifestoEpisodio(id_conteudo, id_usuario);
    res.status(200).json(payload);
}

export async function create(req: Request, res: Response, next: NextFunction)
{
    const payload = req.body;
    const episodio = await episodiosService.create(payload);
    res.status(201).json(episodio);
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const payload = req.body;
    const episodio = await episodiosService.update(id, payload);
    res.status(200).json(episodio);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await episodiosService.remove(id);
    res.status(204).end();
}