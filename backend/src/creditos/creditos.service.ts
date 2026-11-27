import * as creditosRepository from "./creditos.repository";
import * as appErrors from "../errors/AppErrors";
import { Credito, PapelCredito } from "./creditos.entity";

export async function upsert(
    id_artista: number,
    id_conteudo: number,
    papel: PapelCredito
)
{
    const credito = new Credito({id_artista, id_conteudo, papel});
    try
    {
        const payload = await creditosRepository.upsert(credito);
        return payload;
    }
    catch (err: any)
    {
        if (err.code === 'CREDIT_NON_EXISTING_ARTIST_REFERENCE')
        {
            throw new appErrors.NotFoundError("Artista não encontrado.");
        }
        else if (err.code === 'CREDIT_NON_EXISTING_CONTENT_REFERENCE')
        {
            throw new appErrors.NotFoundError("Conteudo não encontrado.");
        }
        else
        {
            throw err;
        }
    }
}

export async function getByConteudo(id_conteudo: number)
{
    const creditos = await creditosRepository.getByConteudo(id_conteudo);
    const creditos_dict: Record<PapelCredito, any[]> = {"ator":  [], "diretor": [], "roteirista": []};
    for (let i = 0; i < creditos.length; i++)
    {
        creditos_dict[creditos[i].papel as PapelCredito].push(creditos[i]);
    }
    return {
        id_conteudo: id_conteudo,
        creditos: creditos_dict,
    };
}

export async function getByArtista(id_artista: number)
{
    const creditos = await creditosRepository.getByArtista(id_artista);
    const creditos_dict: Record<PapelCredito, any[]> = {"ator":  [], "diretor": [], "roteirista": []};
    for (let i = 0; i < creditos.length; i++)
    {
        creditos_dict[creditos[i].papel as PapelCredito].push(creditos[i]);
    }
    return {
        id_artista: id_artista,
        participacoes: creditos_dict,
    };
}

export async function remove(id: number)
{
    const deleted = await creditosRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Credito não encontrado");
    }
}