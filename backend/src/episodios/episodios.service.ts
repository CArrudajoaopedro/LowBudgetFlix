import * as episodiosRepository from "./episodios.repository";
import { CreateEpisodioDTO, UpdateEpisodioDTO, QueryEpisodioDTO, EpisodioResponseSchema } from "./episodios.schema";
import { getById as getConteudoById } from "../conteudos/conteudos.service";
import { Conteudo } from "../conteudos/conteudos.entity";
import * as appError from "../errors/AppErrors"

async function _assertEpisodioIdExiste(id: number)
{
    const episodio = await episodiosRepository.getById(id);
    if (!episodio)
    {
        throw new appError.NotFoundError("Episódio não encontrado.");
    }
    return episodio;
}

async function _assertSerieIdExiste(id: number)
{
    const conteudo = await getConteudoById(id);
    if (!conteudo || conteudo.tipo != 'serie')
    {
        throw new appError.NotFoundError("Série não encontrada");
    }
}

export async function getById(id: number)
{
    const episodio = await _assertEpisodioIdExiste(id);
    return EpisodioResponseSchema.parse(episodio);
}

export async function getBySerie(
    id_serie: number,
    dto: QueryEpisodioDTO
)
{
    await _assertSerieIdExiste(id_serie);
    const {temporada, numero} = dto;
    const episodios = await episodiosRepository.getBySerie(id_serie, temporada, numero);
    return episodios.map((e) => EpisodioResponseSchema.parse(e));
}

export async function create(dto: CreateEpisodioDTO)
{
    const {id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero} = dto;
    await _assertSerieIdExiste(id_conteudo);
    const episodio = await episodiosRepository.create(id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero);
    return EpisodioResponseSchema.parse(episodio);
}

export async function update(id: number, dto: UpdateEpisodioDTO)
{
    const {id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero} = dto;
    if (id_conteudo)
    {
        await _assertSerieIdExiste(id_conteudo);
    }
    const episodio = await episodiosRepository.update(id, id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero);
    return EpisodioResponseSchema.parse(episodio);
}

export async function remove(id: number)
{
    await _assertEpisodioIdExiste(id);
    await episodiosRepository.remove(id);
}