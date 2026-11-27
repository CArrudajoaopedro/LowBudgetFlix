import * as conteudosRepository from "./conteudos.repository";
import * as conteudosSchema from "./conteudos.schema";
import * as appErrors from "../errors/AppErrors"
import { getByUsuarioFilme as getHistorico } from "../historico_visualizacao/historico_visualizacao.repository";
import { getByFilme as getFaixas } from "../faixas/faixas.repository";
import { Conteudo } from "./conteudos.entity";
import { Faixa } from "../faixas/faixas.entity";

export async function _assertFilmeIdExiste(id: number)
{
    const conteudo = await conteudosRepository.getById(id);
    if (!conteudo || conteudo.tipo !== 'filme')
    {
        throw new appErrors.NotFoundError("Filme não encontrado");
    }
    return conteudo;
}

export async function getManifestoFilme(id_conteudo: number, id_usuario: number)
{
    const conteudo = await _assertFilmeIdExiste(id_conteudo);
    const [historico, faixas] = await Promise.all([
        getHistorico(id_usuario, id_conteudo),
        getFaixas(id_conteudo, null, null, null, null)
    ])
    const faixas_dict: Record<string, Faixa[]> = {"video":  [], "audio": [], "legenda": [], "thumbnail": []};
    for (let i = 0; i < faixas.length; i++)
    {
        faixas_dict[faixas[i].tipo].push(faixas[i]);
    }
    return {
        conteudo: {
            id: conteudo.id,
            titulo: conteudo.titulo,
            duracao: conteudo.duracao,
        },
        progresso_atual: historico ? historico.progresso : 0,
        faixas: faixas_dict,
    };
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
    const conteudo = await conteudosRepository.getById(id);
    if (!conteudo)
    {
        throw new appErrors.NotFoundError("Conteúdo não encontrado");
    }
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
    const {titulo, tipo, sinopse, lancamento, duracao} = dto;
    const conteudo = await conteudosRepository.update(
        id,
        titulo,
        sinopse,
        tipo,
        lancamento,
        duracao
    );
    if (!conteudo)
    {
        throw new appErrors.NotFoundError("Conteudo não encontrado.");
    }
    const responseDTO = conteudosSchema.ConteudoResponseSchema.parse(conteudo);
    return responseDTO;
}

export async function remove(id: number)
{
    const deleted = await conteudosRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Conteudo não encontrado.");
    }
}