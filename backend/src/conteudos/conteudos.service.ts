import * as conteudosRepository from "./conteudos.repository";
import * as conteudosSchema from "./conteudos.schema";
import { Conteudo } from "./conteudos.entity";
import * as appErrors from "../errors/AppErrors"

async function _assertConteudoIdExiste(id: number) {
    const conteudo = await conteudosRepository.getById(id);
    if (!conteudo)
    {
        throw new appErrors.NotFoundError("Conteudo não encontrado.");
    }
    return conteudo;
}

export async function getFilteredPaged(dto: conteudosSchema.QueryConteudoDTO)
{
    const {titulo, sinopse, tipo, lancamentoInicial, lancamentoFinal, duracaoMinima, duracaoMaxima, skip, limit} = dto;
    const conteudos = await conteudosRepository.getFilteredPaged(
        titulo,
        sinopse,
        tipo,
        lancamentoInicial,
        lancamentoFinal,
        duracaoMinima,
        duracaoMaxima,
        skip,
        limit
    )
    const responseDTO = conteudos.map((c) => conteudosSchema.ConteudoResponseSchema.parse(c));
    return responseDTO;
}

export async function getById(id: number)
{
    const conteudo = await _assertConteudoIdExiste(id);
    const dto = conteudosSchema.ConteudoResponseSchema.parse(conteudo);
    return dto;
}

export async function create(dto: conteudosSchema.CreateConteudoDTO)
{
    const {titulo, tipo, sinopse, lancamento, duracao} = dto;
    const conteudo = await conteudosRepository.create(
        titulo,
        sinopse,
        tipo,
        lancamento,
        duracao
    );
    const responseDTO = conteudosSchema.ConteudoResponseSchema.parse(conteudo);
    return responseDTO;
}

export async function update(id: number, dto: conteudosSchema.UpdateConteudoDTO)
{
    await _assertConteudoIdExiste(id);
    const {titulo, tipo, sinopse, lancamento, duracao} = dto;
    const conteudo = await conteudosRepository.update(
        id,
        titulo,
        sinopse,
        tipo,
        lancamento,
        duracao
    );
    const responseDTO = conteudosSchema.ConteudoResponseSchema.parse(conteudo);
    return responseDTO;
}

export async function remove(id: number)
{
    await _assertConteudoIdExiste(id);
    await conteudosRepository.remove(id);
}