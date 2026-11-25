import { Faixa } from "./faixas.entity";
import * as faixasService from "./faixas.service";
import { Request, Response, NextFunction } from "express";

export async function getByEpisodio(req: Request, res: Response, next: NextFunction)
{
    const id_episodio = res.locals.params.id;
    const query = res.locals.query;
    const faixa = await faixasService.getByEpisodio(id_episodio, query);
    res.status(200).json(faixa);
}

export async function getByFilme(req: Request, res: Response, next: NextFunction)
{
    const id_filme = res.locals.params.id;
    const query = res.locals.query;
    const faixa = await faixasService.getByFilme(id_filme, query);
    res.status(200).json(faixa);
}

export async function getById(req: Request, res: Response, next: NextFunction)
{
    const id_faixa = res.locals.params.id;
    const faixa = await faixasService.getById(id_faixa);
    res.status(200).json(faixa);
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id_faixa = res.locals.params.id;
    const dto = req.body;
    const faixa = await faixasService.update(id_faixa, dto);
    res.status(200).json(faixa);
}

export async function createFaixaEpisodio(req: Request, res: Response, next: NextFunction)
{
    const id_episodio = res.locals.params.id;
    const dto = req.body;
    const faixa_dto = new Faixa({...dto, id_episodio: id_episodio});
    const faixa = await faixasService.create(faixa_dto);
    res.status(201).json(faixa);  
}

export async function createFaixaFilme(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const dto = req.body;
    const faixa_dto = new Faixa({...dto, id_conteudo: id_conteudo});
    const faixa = await faixasService.create(faixa_dto);
    res.status(201).json(faixa);  
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id_faixa = res.locals.params.id;
    await faixasService.remove(id_faixa);
    res.status(204).end();
}