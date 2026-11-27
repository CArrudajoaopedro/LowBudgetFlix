import { Pool, PoolClient } from "pg";
import { pool } from "../db";
import { Avaliacao } from "./avaliacoes.entity";

export async function upsert(obj: Avaliacao, db: Pool | PoolClient = pool)
{
    const values = [obj.id_usuario, obj.id_conteudo, obj.nota];
    const query = `INSERT INTO avaliacoes
    (id_usuario, id_conteudo, nota)
    VALUES
    ($1, $2, $3)
    ON CONFLICT ON CONSTRAINT avaliacao_unique_usuario_conteudo
    DO UPDATE SET
    nota = EXCLUDED.nota
    RETURNING *;`;
    try
    {
        const result = await db.query(query, values);
        const avaliacao = new Avaliacao(result.rows[0]);
        return avaliacao;
    }
    catch (err: any)
    {
        if (err.code === '23503' && err.constraint === 'fk_avalacao_usuario')
        {
            const error: any = new Error("REVIEW_NON_EXISTING_USER_REFERENCE");
            error.code = 'REVIEW_NON_EXISTING_USER_REFERENCE';
            throw error;
        }
        else if (err.code === '23503' && err.constraint === 'fk_avaliacao_conteudo')
        {
            const error: any = new Error("REVIEW_NON_EXISTING_CONTENT_REFERENCE");
            error.code = 'REVIEW_NON_EXISTING_CONTENT_REFERENCE';
            throw error;
        }
        else
        {
            throw err;
        }
    }
}

export async function getByUsuarioFilme(id_usuario: number, id_conteudo: number)
{
    const query = "SELECT * FROM avaliacoes WHERE id_usuario = $1 AND id_conteudo = $2;";
    const result = await pool.query(query, [id_usuario, id_conteudo]);
    if (!result.rows[0])
    {
        return null;
    }
    const avaliacao = new Avaliacao(result.rows[0]);
    return avaliacao;
}

export async function getMedia(id_conteudo: number)
{
    const query = `SELECT id_conteudo, AVG(nota) AS media, COUNT(id) AS total_avaliacoes
    FROM avaliacoes WHERE id_conteudo = $1
    GROUP BY id_conteudo;`
    const values = [id_conteudo];
    const result = await pool.query(query, values);
    if (!result.rowCount)
    {
        return null;
    }
    const estatisticas = result.rows[0];
    return estatisticas;
}

export async function remove(id_usuario: number, id_conteudo: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM avaliacoes WHERE id_usuario = $1 AND id_conteudo = $2 RETURNING id";
    const values = [id_usuario, id_conteudo];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}