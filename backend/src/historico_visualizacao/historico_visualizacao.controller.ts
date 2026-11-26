import * as historicoService from "./historico_visualizacao.service";
import { Request, Response, NextFunction } from "express";

export async function upsertByConteudo(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    const dto = req.body;
    const historico = await historicoService.upsertByConteudo(id_usuario, id_conteudo, dto);
    res.status(200).json(historico);
}

export async function upsertByEpisodio(req: Request, res: Response, next: NextFunction)
{
    const id_episodio = res.locals.params.id;
    const id_usuario = req.user!.id;
    const dto = req.body;
    const historico = await historicoService.upsertByEpisodio(id_usuario, id_episodio, dto);
    res.status(200).json(historico);
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id_historico = res.locals.params.id;
    await historicoService.remove(id_historico);
    res.status(204).end();
}