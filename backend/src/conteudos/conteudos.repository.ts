import { pool } from "../db";
import { Conteudo, TipoConteudo } from "./conteudos.entity";

export async function getFilteredPaged(
    titulo: string | null,
    sinopse: string | null,
    tipos: TipoConteudo[] | null,
    lancamentoInicial: Date | null,
    lancamentoFinal: Date | null,
    duracaoMinima: number | null,
    duracaoMaxima: number | null,
    skip: number = 0,
    limit: number = 100
)
{
    const baseQuery = "SELECT * FROM conteudos";
    let filterValues = [];
    let filterQueries = [];
    if (titulo)
    {
        filterQueries.push(`titulo LIKE '%$${filterValues.length + 1}%'`);
        filterValues.push(titulo);
    }
    if (sinopse)
    {
        filterQueries.push(`sinopse LIKE '%$${filterValues.length + 1}%'`);
        filterValues.push(sinopse);
    }
    if (tipos != null && tipos.length > 0)
    {
        filterQueries.push(`tipo IN $${filterValues.length + 1}`);
        filterValues.push(`(${tipos.join(",")})`);
    }
    if (lancamentoInicial != null)
    {
        filterQueries.push(`lancamento >= $${filterValues.length + 1}`);
        filterValues.push(lancamentoInicial);
    }
    if (lancamentoFinal != null)
    {
        filterQueries.push(`lancamento <= $${filterValues.length + 1}`);
        filterValues.push(lancamentoFinal);
    }
    if (duracaoMinima)
    {
        filterQueries.push(`duracao >= $${filterValues.length + 1}`);
        filterValues.push(duracaoMinima);
    }
    if (duracaoMaxima)
    {
        filterQueries.push(`duracao <= $${filterValues.length + 1}`);
        filterValues.push(duracaoMaxima);
    }
    const filterFullQuery = filterValues.length > 0 ? ` WHERE ${filterQueries.join(" AND ")}` : "";
    const offsetQuery = ` ORDER BY id OFFSET $${filterValues.length + 1} ROWS FETCH FIRST $${filterValues.length + 2} ROWS ONLY`;
    const query = baseQuery + filterFullQuery + offsetQuery + ';';
    const values = filterValues.concat([skip * limit, limit]);
    const result = await pool.query(query, values);
    const conteudos = result.rows.map((row) => new Conteudo(row));
    return conteudos;
}
export async function getById(id: number)
{
    const query = "SELECT * FROM conteudos WHERE id = $1;";
    const result = await pool.query(query, [id]);
    const conteudo = new Conteudo(result.rows[0]);
    return conteudo;
}
export async function create(
    titulo: string,
    sinopse: string,
    tipo: TipoConteudo,
    lancamento: Date,
    duracao: number
)
{
    const query = "INSERT INTO conteudos (titulo, sinopse, tipo, lancamento, duracao) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    const values = [titulo, sinopse, tipo, lancamento, duracao];
    const result = await pool.query(query, values);
    const conteudo = new Conteudo(result.rows[0]);
    return conteudo;
}
export async function update(
    id: number,
    titulo: string | null,
    sinopse: string | null,
    tipo: TipoConteudo | null,
    lancamento: Date | null,
    duracao: number | null
)
{
    const baseQuery = "UPDATE conteudos";
    let updatedValues = [];
    let updateQueries = [];
    if (titulo)
    {
        updateQueries.push(`titulo = '$${updatedValues.length + 1}'`);
        updatedValues.push(titulo);
    }
    if (sinopse)
    {
        updateQueries.push(`sinopse = '$${updatedValues.length + 1}'`);
        updatedValues.push(sinopse);
    }
    if (tipo != null)
    {
        updateQueries.push(`tipo = $${updatedValues.length + 1}`);
        updatedValues.push(tipo);
    }
    if (lancamento != null)
    {
        updateQueries.push(`lancamento = $${updatedValues.length + 1}`);
        updatedValues.push(lancamento);
    }
    if (duracao)
    {
        updateQueries.push(`duracao = $${updatedValues.length + 1}`);
        updatedValues.push(duracao);
    }
    if (updatedValues.length == 0)
    {
        const result = await pool.query("SELECT * FROM conteudos WHERE id = $1", [id]);
        const conteudo = new Conteudo(result.rows[0]);
        return conteudo;
    }
    const updateFullQuery = ` SET ${updateQueries.join(",")}`;
    const query = baseQuery + updateFullQuery + ` WHERE id = $${updatedValues.length + 1};`;
    const values = updatedValues.concat([id]);
    const result = await pool.query(query, values);
    const conteudo = new Conteudo(result.rows[0]);
    return conteudo;
}
export async function remove(id: number)
{
    const query = "DELETE FROM conteudos WHERE id = $1;";
    await pool.query(query, [id]);
}