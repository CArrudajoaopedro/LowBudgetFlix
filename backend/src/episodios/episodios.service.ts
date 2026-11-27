import * as episodiosRepository from "./episodios.repository";
import * as appError from "../errors/AppErrors";
import { CreateEpisodioDTO, UpdateEpisodioDTO, QueryEpisodioDTO, EpisodioResponseSchema } from "./episodios.schema";
import { getById as getConteudoById } from "../conteudos/conteudos.repository";
import { transaction } from "../db";
import { Faixa } from "../faixas/faixas.entity";
import { getByUsuarioEpisodio as getHistorico } from "../historico_visualizacao/historico_visualizacao.repository";
import { getByEpisodio as getFaixas } from "../faixas/faixas.repository";
import { getById as getConteudo } from "../conteudos/conteudos.repository";

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
    const episodio = await episodiosRepository.getById(id);
    if (!episodio)
    {
        throw new appError.NotFoundError("Episódio não encontrado.");
    }
    return EpisodioResponseSchema.parse(episodio);
}

async function _getBySerie(
    id_serie: number,
    dto: QueryEpisodioDTO
)
{
    await _assertSerieIdExiste(id_serie);
    const {temporada, numero} = dto;
    const episodios = await episodiosRepository.getBySerie(id_serie, temporada, numero);
    return episodios.map((e) => EpisodioResponseSchema.parse(e));
}

async function _create(dto: CreateEpisodioDTO)
{
    const {id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero} = dto;
    await _assertSerieIdExiste(id_conteudo);
    const episodio = await episodiosRepository.create(id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero);
    return EpisodioResponseSchema.parse(episodio);
}

async function _update(id: number, dto: UpdateEpisodioDTO)
{
    const {id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero} = dto;
    if (id_conteudo)
    {
        await _assertSerieIdExiste(id_conteudo);
    }
    const episodio = await episodiosRepository.update(id, id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero);
    return EpisodioResponseSchema.parse(episodio);
}

export async function getBySerie(
    id_serie: number,
    dto: QueryEpisodioDTO
)
{
    return transaction(_getBySerie, id_serie, dto);
}

export async function getManifestoEpisodio(id_episodio: number, id_usuario: number)
{
    const episodio = await episodiosRepository.getById(id_episodio);
    if (!episodio)
    {
        throw new appError.NotFoundError("Episodio não encontrado.");
    }
    const conteudo = await getConteudo(episodio.id_conteudo);
    const [historico, faixas] = await Promise.all([
        getHistorico(id_usuario, id_episodio),
        getFaixas(id_episodio, null, null, null, null)
    ]);
    const faixas_dict: Record<string, Faixa[]> = {"video":  [], "audio": [], "legenda": [], "thumbnail": []};
    for (let i = 0; i < faixas.length; i++)
    {
        faixas_dict[faixas[i].tipo].push(faixas[i]);
    }
    return {
        episodio: {
            conteudo: {
            id: conteudo!.id,
            titulo: conteudo!.titulo
            },
            titulo: episodio.titulo,
            sinopse: episodio.sinopse,
            duracao: episodio.duracao,
            temporada: episodio.temporada,
            numero: episodio.numero
        },
        progresso_atual: historico ? historico.progresso : 0,
        faixas: faixas_dict,
    };
}

export async function create(dto: CreateEpisodioDTO)
{
    return await transaction(_create, dto);
}

export async function update(id: number, dto: UpdateEpisodioDTO)
{
    return await transaction(_update, id, dto);
}

export async function remove(id: number)
{
    const deleted = await episodiosRepository.remove(id);
    if (!deleted)
    {
        throw new appError.NotFoundError("Episódio não encontrado.");
    }
}