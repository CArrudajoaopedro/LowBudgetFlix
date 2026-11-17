import { pool } from "../db";
import { Episodio } from "./episodios.entity";

export async function getById(id: number, db=pool)
{
    const query = "SELECT * FROM episodios WHERE id = $1;";
    const values= [id];
    const result = await db.query(query, values);
    const row = result.rows[0];
    if (!row)
    {
        return null;
    }
    const episodio = new Episodio(row);
    return episodio;
}

export async function getBySerie(
    id_serie: number,
    temporada: number | null | undefined,
    numero: number | null | undefined,
    db=pool
)
{
    const baseQuery = "SELECT * FROM episodios WHERE id_conteudo = $1";
    const baseValues = [id_serie];
    let filterQueries = [];
    let filterValues = [];
    if (temporada)
    {
        filterQueries.push(`temporada = $${filterValues.length + 2}`);
        filterValues.push(temporada);
    }
    if (numero)
    {
        filterQueries.push(`numero = $${filterValues.length + 2}`);
        filterValues.push(numero);
    }
    const filterQuery = filterValues.length ? ` AND ${filterQueries.join(" AND ")}` : "";
    const query = baseQuery + filterQuery + ';';
    const values = baseValues.concat(filterValues);
    const result = await db.query(query, values);
    const episodios = result.rows.map((r) => new Episodio(r));
    return episodios;
}

export async function create(
    id_conteudo: number,
    titulo: string,
    sinopse: string,
    lancamento: Date,
    duracao: number,
    temporada: number,
    numero: number,
    db=pool
)
{
    try
    {
        const query = "INSERT INTO episodios (id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;"
        const values = [id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero];
        const result = await db.query(query, values);
        const episodio = new Episodio(result.rows[0]);
        return episodio;
    }
    catch (err: any)
    {
        if (err.code === '23505' && err.constraint === 'unq_temp_num_episodio')
        {
            const error: any = new Error("TEMPORADA_NUMERO_ALREADY_EXISTS");
            error.code = "TEMPORADA_NUMERO_ALREADY_EXISTS";
            throw error;
        }
        else if (err.code === '23503' && err.constraint === 'fk_episodio_conteudo')
        {
            const error: any = new Error("EPISODIO_NOT_FOUND");
            error.code = "EPISODIO_NOT_FOUND";
            throw error;
        }
        else
        {
            throw err;
        }
    }
}

export async function update(
    id: number,
    id_conteudo: number | null | undefined,
    titulo: string | null | undefined,
    sinopse: string | null | undefined,
    lancamento: Date | null | undefined,
    duracao: number | null | undefined,
    temporada: number | null |undefined,
    numero: number | null |undefined,
    db=pool
)
{
    const baseQuery = "UPDATE episodios";
    let updatedValues = [];
    let updateQueries = [];
    if (titulo)
    {
        updateQueries.push(`titulo = $${updatedValues.length + 1}`);
        updatedValues.push(titulo);
    }
    if (sinopse)
    {
        updateQueries.push(`sinopse = $${updatedValues.length + 1}`);
        updatedValues.push(sinopse);
    }
    if (id_conteudo)
    {
        updateQueries.push(`id_conteudo = $${updatedValues.length + 1}`);
        updatedValues.push(id_conteudo);
    }
    if (lancamento)
    {
        updateQueries.push(`lancamento = $${updatedValues.length + 1}`);
        updatedValues.push(lancamento);
    }
    if (duracao)
    {
        updateQueries.push(`duracao = $${updatedValues.length + 1}`);
        updatedValues.push(duracao);
    }
    if (temporada)
    {
        updateQueries.push(`temporada = $${updatedValues.length + 1}`);
        updatedValues.push(temporada);
    }
    if (numero)
    {
        updateQueries.push(`numero = $${updatedValues.length + 1}`);
        updatedValues.push(numero);
    }
    if (updatedValues.length == 0)
    {
        const result = await db.query("SELECT * FROM episodios WHERE id = $1", [id]);
        const episodio = new Episodio(result.rows[0]);
        return episodio;
    }
    const updateFullQuery = ` SET ${updateQueries.join(",")}`;
    const query = baseQuery + updateFullQuery + ` WHERE id = $${updatedValues.length + 1} RETURNING *;`;
    const values = updatedValues.concat([id]);
    const result = await db.query(query, values);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const episodio = new Episodio(row);
    return episodio;
}
export async function remove(id: number, db=pool)
{
    const query = "DELETE FROM episodios WHERE id = $1;";
    const deleted = await db.query(query, [id]);
    return deleted.rowCount;
}