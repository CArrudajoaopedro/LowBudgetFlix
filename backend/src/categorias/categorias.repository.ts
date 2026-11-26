import { pool } from "../db";
import { Pool, PoolClient } from "pg";
import { Categoria } from "./categorias.entity";

export async function getFilteredPaged(
    nome: string | null | undefined,
    skip: number = 0,
    limit: number = 100,
    db: Pool | PoolClient = pool
)
{
    const select_clause = "SELECT * FROM categorias";
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
    const categorias = result.rows;
    return categorias;
}

export async function create(nome: string, db: Pool | PoolClient = pool)
{
    const query = "INSERT INTO categorias (nome) VALUES ($1) RETURNING *;";
    const values = [nome];
    const result = await db.query(query, values);
    const categoria = new Categoria(result.rows[0]);
    return categoria;
}

export async function update(id: number, nome: string, db: Pool | PoolClient = pool)
{
    const query = "UPDATE categorias SET nome = $1 RETURNING *;";
    const values = [nome];
    const result = await db.query(query, values);
    if (!result.rowCount)
    {
        return null;
    }
    const categoria = new Categoria(result.rows[0]);
    return categoria;
}

export async function remove(id: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM categorias WHERE id = $1 RETURNING id;";
    const values = [id];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}