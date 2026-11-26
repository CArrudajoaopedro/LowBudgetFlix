import { pool } from "../db";
import { Pool, PoolClient } from "pg";
import { Artista } from "./artistas.entity";

export async function create(obj: Artista, db: Pool | PoolClient = pool)
{
    const query = `INSET INTO artistas
    (nome, nascimento, nacionalidade, url_foto)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`;
    const values = [obj.nome, obj.nascimento, obj.nacionalidade, obj.url_foto];
    const result = await db.query(query, values);
    const artista = new Artista(result.rows[0]);
    return artista;
}

export async function getFilteredPaged(
    nome: string | null | undefined,
    skip: number = 0,
    limit: number = 100,
    db: Pool | PoolClient = pool
)
{
    const select_clause = "SELECT * FROM artistas";
    let where_clause = "";
    const values = [];
    if (nome)
    {
        values.push(`%${nome}%`);
        where_clause = ` WHERE nome ILIKE $${values.length}`;
    }
    const offset_clause = ` ORDER BY nome OFFSET $${values.length + 1} ROWS FETCH FIRST $${values.length + 2} ROWS ONLY`;
    values.push(skip * limit);
    values.push(limit);
    const query = select_clause + where_clause + offset_clause + ';';
    const result = await db.query(query, values);
    const artistas = result.rows;
    return artistas;
}

export async function update(id: number, fields: any, db: Pool | PoolClient = pool)
{
    const update_clause = "UPDATE artistas";
    const values = [];
    const updates = [];
    if (fields.url_foto)
    {
        values.push(fields.url_foto);
        updates.push(`url_foto = $${values.length}`);
    }
    if (fields.nascimento)
    {
        values.push(fields.nascimento);
        updates.push(`nascimento = $${values.length}`);
    }
    if (fields.nacionalidade)
    {
        values.push(fields.nacionalidade);
        updates.push(`nacionalidade = $${values.length}`);
    }
    if (fields.nome)
    {
        values.push(fields.nome);
        updates.push(`nome = $${values.length}`);
    }
    values.push(id);
    const set_clause = ` SET ${updates.join(', ')}`;
    const where_clause = ` WHERE id = $${values.length}`;
    const return_clause = " RETURNING *;";
    const query = update_clause + set_clause + where_clause + return_clause;
    const result = await db.query(query, values);
    if (!result.rowCount)
    {
        return null;
    }
    const artista = new Artista(result.rows[0]);
    return artista;
}

export async function remove(id: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM artistas WHERE id = $1 RETURNING id";
    const values = [id];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}