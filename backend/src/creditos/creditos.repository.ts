import { Pool, PoolClient } from "pg";
import { pool } from "../db";
import { Credito } from "./creditos.entity";

export async function upsert(obj: Credito, db: Pool | PoolClient = pool)
{
    const values = [obj.id_artista, obj.id_conteudo, obj.papel];
    const query = `INSERT INTO creditos
    (id_artista, id_conteudo, papel)
    VALUES
    ($1, $2, $3)
    ON CONFLICT DO NOTHING
    RETURNING *;`;
    try
    {
        const result = await db.query(query, values);
        const historico = new Credito(result.rows[0]);
        return historico;
    }
    catch (err: any)
    {
        if (err.code === '23503' && err.constraint === 'fk_credito_artista')
        {
            const error: any = new Error("CREDIT_NON_EXISTING_ARTIST_REFERENCE");
            error.code = 'CREDIT_NON_EXISTING_ARTIST_REFERENCE';
            throw error;
        }
        else if (err.code === '23503' && err.constraint === 'fk_credito_conteudo')
        {
            const error: any = new Error("CREDIT_NON_EXISTING_CONTENT_REFERENCE");
            error.code = 'CREDIT_NON_EXISTING_CONTENT_REFERENCE';
            throw error;
        }
        else
        {
            throw err;
        }
    }
}

export async function getByConteudo(id_conteudo: number)
{
    const query = `SELECT ar.*, cr.papel
    FROM creditos AS cr JOIN artistas AS ar
    ON cr.id_artista = ar.id
    WHERE cr.id_conteudo = $1;`;
    const result = await pool.query(query, [id_conteudo]);
    const creditos = result.rows;
    return creditos;
}

export async function getByArtista(id_artista: number)
{
    const query = `SELECT con.*, cr.papel
    FROM creditos AS cr JOIN conteudos AS con
    ON cr.id_conteudo = con.id
    WHERE cr.id_artista = $1;`;
    const result = await pool.query(query, [id_artista]);
    const creditos = result.rows;
    return creditos;
}

export async function remove(id: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM creditos WHERE id = $1 RETURNING id";
    const values = [id];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}