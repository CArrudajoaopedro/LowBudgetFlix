import { Pool, PoolClient } from "pg";
import { pool } from "../db";
import { HistoricoVisualizacao } from "./historico_visualizacao.entity";

export async function upsert(obj: HistoricoVisualizacao, db: Pool | PoolClient = pool)
{
    const values = [obj.id_usuario, obj.id_conteudo, obj.progresso];
    let insert_fields: string = "(id_usuario, id_conteudo, progresso)";
    let constraint: string = "historico_unique_usuario_conteudo";
    if (obj.id_episodio)
    {
        insert_fields = "(id_usuario, id_episodio, progresso)";
        constraint = "historico_unique_usuario_episodio";
        values[1] = obj.id_episodio;
    }
    const query = `INSERT INTO historico_visualizacao
    ${insert_fields}
    VALUES
    ($1, $2, $3)
    ON CONFLICT ON CONSTRAINT ${constraint}
    DO UPDATE SET
    progresso = EXCLUDED.progresso,
    atualizado_em = EXCLUDED.atualizado_em
    RETURNING *;`;
    try
    {
        const result = await db.query(query, values);
        const historico = new HistoricoVisualizacao(result.rows[0]);
        return historico;
    }
    catch (err: any)
    {
        if (err.code === '23503' && err.constraint === 'fk_historico_episodio')
        {
            const error: any = new Error("HISTORY_NON_EXISTING_EPISODE_REFERENCE");
            error.code = 'HISTORY_NON_EXISTING_EPISODE_REFERENCE';
            throw error;
        }
        else if (err.code === '23503' && err.constraint === 'fk_historico_conteudo')
        {
            const error: any = new Error("HISTORY_NON_EXISTING_CONTENT_REFERENCE");
            error.code = 'HISTORY_NON_EXISTING_CONTENT_REFERENCE';
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
    const query = "SELECT * FROM historico_visualizacao WHERE id_usuario = $1 AND id_conteudo = $2;";
    const result = await pool.query(query, [id_usuario, id_conteudo]);
    if (!result.rows[0])
    {
        return null;
    }
    const historico = new HistoricoVisualizacao(result.rows[0]);
    return historico;
}

export async function getByUsuarioEpisodio(id_usuario: number, id_episodio: number)
{
    const query = "SELECT * FROM historico_visualizacao WHERE id_usuario = $1 AND id_episodio = $2;";
    const result = await pool.query(query, [id_usuario, id_episodio]);
    if (!result.rows[0])
    {
        return null;
    }
    const historico = new HistoricoVisualizacao(result.rows[0]);
    return historico;
}

export async function remove(id: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM historico_visualizacao WHERE id = $1 RETURNING id";
    const values = [id];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}