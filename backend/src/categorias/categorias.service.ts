import * as categoriasRepository from "./categorias.repository";
import * as appErrors from "../errors/AppErrors";
import { ResponseCategoriaSchema } from "./categorias.schema";

export async function create(nome: string)
{
    const result = await categoriasRepository.create(nome);
    const categoria = ResponseCategoriaSchema.parse(result);
    return categoria;
}

export async function getFilteredPaged(nome: string | null | undefined, skip: number = 0, limit: number = 100)
{
    const result = await categoriasRepository.getFilteredPaged(nome, skip, limit);
    const categorias = result.map((c) => ResponseCategoriaSchema.parse(c));
    return categorias;
}

export async function getConteudos(id_categoria: number, skip = 0, limit = 100)
{
    const conteudos = await categoriasRepository.getConteudos(id_categoria, skip, limit);
    return {
        id_categoria: id_categoria,
        conteudos: conteudos
    };
}

export async function update(id: number, nome: string)
{
    const result = await categoriasRepository.update(id, nome);
    if (!result)
    {
        throw new appErrors.NotFoundError("Categoria não encontrada");
    }
    const categoria = ResponseCategoriaSchema.parse(result);
    return categoria;
}

export async function remove(id: number)
{
    const deleted = await categoriasRepository.remove(id);
    if (!deleted)
    {
        throw new appErrors.NotFoundError("Categoria não encontrada");
    }
}