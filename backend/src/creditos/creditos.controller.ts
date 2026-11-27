import * as creditosService from "./creditos.service";
import { Request, Response, NextFunction } from "express";

export async function upsert(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const {id_artista, papel} = req.body;
    const avaliacao = await creditosService.upsert(id_artista, id_conteudo, papel);
    res.status(200).json(avaliacao);
}

export async function getByConteudo(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const creditos = await creditosService.getByConteudo(id_conteudo);
    res.status(200).json(creditos);
}

export async function getByArtista(req: Request, res: Response, next: NextFunction)
{
    const id_artista = res.locals.params.id;
    const participacoes = await creditosService.getByArtista(id_artista);
    res.status(200).json(participacoes);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await creditosService.remove(id);
    res.status(204).end();
}