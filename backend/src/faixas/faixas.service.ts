import { QueryFaixaDTO, ShortResponseFaixaEpisodioSchema, ShortResponseFaixaFilmeSchema, FullResponseFaixaSchema, UpdateFaixaDTO } from "./faixas.schema";
import * as faixasRepository from "./faixas.repository";
import * as appErrors from "../errors/AppErrors";
import { getById as getConteudoById } from "../conteudos/conteudos.repository";
import { Faixa } from "./faixas.entity";
import { transaction } from "../db";

async function _assertFilmeIdExiste(id: number)
{
    const conteudo = await getConteudoById(id);
    if (!conteudo || conteudo.tipo !== 'filme')
    {
        throw new appErrors.NotFoundError("Filme não encontrado");
    }
}

export async function getByFilme(
    id_conteudo: number,
    dto: QueryFaixaDTO
)
{
    const {tipo, resolucao, linguagem, flag_original} = dto;
    const result = await faixasRepository.getShortByFilme(
        id_conteudo,
        tipo,
        resolucao,
        linguagem,
        flag_original
    );
    if (result == null)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
    const faixa = ShortResponseFaixaFilmeSchema.parse(result);
    return faixa;
}

export async function getByEpisodio(
    id_episodio: number,
    dto: QueryFaixaDTO
)
{
    const {tipo, resolucao, linguagem, flag_original} = dto;
    const result = await faixasRepository.getShortByEpisodio(
        id_episodio,
        tipo,
        resolucao,
        linguagem,
        flag_original
    );
    if (result == null)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
    const faixa = ShortResponseFaixaEpisodioSchema.parse(result);
    return faixa;
}

export async function getById(id: number)
{
    const result = await faixasRepository.getById(id);
    if (!result)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
    const faixa = FullResponseFaixaSchema.parse(result);
    return faixa;
}

async function _create(dto: Faixa)
{
    if (dto.id_conteudo)
    {
        await _assertFilmeIdExiste(dto.id_conteudo);
    }
    try
    {
        const result = await faixasRepository.create(dto);
        const faixa = FullResponseFaixaSchema.parse(result);
        return faixa;
    }
    catch (err: any)
    {
        if (err.code === 'MEDIA_NON_EXISTING_EPISODE_REFERENCE')
        {
            throw new appErrors.NotFoundError("Episódio não encontrado");
        }
        else if (err.code === 'MEDIA_NON_EXISTING_CONTENT_REFERENCE')
        {
            throw new appErrors.NotFoundError("Conteúdo não encontrado");
        }
        else if (err.code === 'MEDIA_MULTIPLE_REFERENCE')
        {
            throw new appErrors.UnprocessableEntityError("Faixa não pode pertencer a um episódio e um filme simultaneamente");
        }
        else if (err.code === 'MEDIA_VIDEO_RESOLUTION')
        {
            throw new appErrors.UnprocessableEntityError("Faixas de vídeo devem ter resolução e são as únicas que podem");
        }
        else if (err.code === 'MEDIA_ORIGINAL_AUDIO')
        {
            throw new appErrors.UnprocessableEntityError("Faixas de audio devem ter flag_original e são as únicas que podem");
        }
        else if (err.code === 'MEDIA_LANGUAGE')
        {
            throw new appErrors.UnprocessableEntityError("Faixas de audio e legenda devem ter linguagem e são as únicas que podem");
        }
        else
        {
            throw err;
        }
    }
}

export async function create(dto: Faixa)
{
    return await transaction(_create, dto);
}

export async function update(id: number, dto: UpdateFaixaDTO)
{
    const result = await faixasRepository.update(id, dto);
    if (!result)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
    const faixa = FullResponseFaixaSchema.parse(result);
    return faixa;
}

export async function remove(id: number)
{
    const deleted = await faixasRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
}