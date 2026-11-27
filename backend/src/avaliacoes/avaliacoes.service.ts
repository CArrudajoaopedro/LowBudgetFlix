import * as avaliacoesRepository from "./avaliacoes.repository";
import * as appErrors from "../errors/AppErrors";
import { Avaliacao } from "./avaliacoes.entity";

export async function upsert(
    id_usuario: number,
    id_conteudo: number,
    nota: number
)
{
    const avaliacao = new Avaliacao({id_usuario, id_conteudo, nota});
    try
    {
        const payload = await avaliacoesRepository.upsert(avaliacao);
        return payload;
    }
    catch (err: any)
    {
        if (err.code === 'REVIEW_NON_EXISTING_USER_REFERENCE')
        {
            throw new appErrors.NotFoundError("Usuario não encontrado.");
        }
        else if (err.code === 'REVIEW_NON_EXISTING_CONTENT_REFERENCE')
        {
            throw new appErrors.NotFoundError("Conteudo não encontrado.");
        }
        else
        {
            throw err;
        }
    }
}

export async function getEstatisticas(id_conteudo: number, id_usuario: number)
{
    const media_avaliacoes = await avaliacoesRepository.getMedia(id_conteudo);
    if (!media_avaliacoes)
    {
        return {
            id_conteudo: id_conteudo,
            media: undefined,
            total_avaliacoes: 0,
            sua_nota: undefined
        };
    }
    const sua_avaliacao = await avaliacoesRepository.getByUsuarioFilme(id_usuario, id_conteudo);
    return {
        id_conteudo: id_conteudo,
        media: media_avaliacoes.media,
        total_avaliacoes: media_avaliacoes.total_avaliacoes,
        sua_nota: sua_avaliacao ? sua_avaliacao.nota : undefined
    };
}

export async function remove(id_conteudo: number, id_usuario: number)
{
    await avaliacoesRepository.remove(id_usuario, id_conteudo);
}