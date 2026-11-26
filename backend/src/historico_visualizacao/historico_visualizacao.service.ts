import * as historicoRepository from "./historico_visualizacao.repository";
import * as appErrors from "../errors/AppErrors";
import { _assertFilmeIdExiste } from "../faixas/faixas.service";
import { transaction } from "../db";
import { UpsertHistoricoDTO } from "./historico_visualizacao.schema";
import { HistoricoVisualizacao } from "./historico_visualizacao.entity";

async function _upsert(
    id_usuario: number,
    id_conteudo: number | null,
    id_episodio: number | null,
    dto: UpsertHistoricoDTO
)
{
    if (id_conteudo)
    {
        await _assertFilmeIdExiste(id_conteudo);
    }
    const historico = new HistoricoVisualizacao(
        {
            id_usuario,
            id_conteudo,
            id_episodio,
            ...dto
        }
    )
    try
    {
        const historico_atualizado = await historicoRepository.upsert(historico);
        return historico_atualizado;
    }
    catch (err: any)
    {
        if (err.code === 'HISTORY_NON_EXISTING_EPISODE_REFERENCE')
        {
            throw new appErrors.NotFoundError("Episodio não encontrado.");
        }
        else
        {
            throw err;
        }
    }
}

export async function upsertByConteudo(
    id_usuario: number,
    id_conteudo: number | null,
    dto: UpsertHistoricoDTO
)
{
    return await transaction(_upsert, id_usuario, id_conteudo, null, dto);
}

export async function upsertByEpisodio(
    id_usuario: number,
    id_episodio: number | null,
    dto: UpsertHistoricoDTO
)
{
    return await transaction(_upsert, id_usuario, null, id_episodio, dto);
}

export async function remove(id: number)
{
    const deleted = await historicoRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Faixa não encontrada");
    }
}