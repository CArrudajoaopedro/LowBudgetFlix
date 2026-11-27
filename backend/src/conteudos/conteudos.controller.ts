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

export async function getManifestoFilme(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_usuario = req.user!.id;
    const payload = await conteudosService.getManifestoFilme(id_conteudo, id_usuario);
    res.status(200).json(payload);
}

export async function getCategorias(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const {skip, limit} = res.locals.query;
    const categorias = await conteudosService.getCategorias(id, skip, limit);
    res.status(200).json(categorias);
}

export async function create(req: Request, res: Response, next: NextFunction)
{
    const dto = req.body;
    const conteudo = await conteudosService.create(dto);
    res.status(201).json(conteudo);
}

export async function insertCategoria(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_categoria = req.body.id_categoria;
    await conteudosService.insertCategoria(id_conteudo, id_categoria);
    res.status(204).end();
}

export async function update(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    const dto = req.body;
    const conteudo = await conteudosService.update(id, dto);
    res.status(200).json(conteudo);
}

export async function removeCategoria(req: Request, res: Response, next: NextFunction)
{
    const id_conteudo = res.locals.params.id;
    const id_categoria = req.body.id_categoria;
    await conteudosService.removeCategoria(id_conteudo, id_categoria);
    res.status(204).end();
}

export async function remove(req: Request, res: Response, next: NextFunction)
{
    const id = res.locals.params.id;
    await conteudosService.remove(id);
    res.status(204).end();
}