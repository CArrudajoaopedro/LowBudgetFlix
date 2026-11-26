import * as artistasRepository from "./artistas.repository";
import * as appErrors from "../errors/AppErrors";
import { ResponseArtistaSchema, UpdateArtistaDTO } from "./artistas.schema";
import { Artista } from "./artistas.entity";

export async function create(dto: Artista)
{
    const result = await artistasRepository.create(dto);
    const artista = ResponseArtistaSchema.parse(result);
    return artista;
}

export async function getFilteredPaged(nome: string | null | undefined, skip: number = 0, limit: number = 100)
{
    const result = await artistasRepository.getFilteredPaged(nome, skip, limit);
    const artistas = result.map((a) => ResponseArtistaSchema.parse(a));
    return artistas;
}

export async function update(id: number, dto: UpdateArtistaDTO)
{
    const result = await artistasRepository.update(id, dto);
    if (!result)
    {
        throw new appErrors.NotFoundError("Artista não encontrado");
    }
    const artista = ResponseArtistaSchema.parse(result);
    return artista;
}

export async function remove(id: number)
{
    const deleted = await artistasRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Artista não encontrado");
    }
}