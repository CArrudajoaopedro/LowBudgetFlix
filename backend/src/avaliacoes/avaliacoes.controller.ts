import * as avaliacoesService from "./avaliacoes.service";
import { Request, Response, NextFunction } from "express";

export async function upsert(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    const {nota} = req.body;
    const avaliacao = await avaliacoesService.upsert(id_usuario, id_conteudo, nota);
    res.status(200).json(avaliacao);
}

export async function getEstatisticas(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    const estatisticas = await avaliacoesService.getEstatisticas(id_conteudo, id_usuario);
    res.status(200).json(estatisticas);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    await avaliacoesService.remove(id_conteudo, id_usuario);
    res.status(204).end();
}