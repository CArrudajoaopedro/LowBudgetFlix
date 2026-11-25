import { Pool, PoolClient } from "pg";
import { pool } from "../db";
import { Faixa, TipoFaixa, ResolucaoVideo } from "./faixas.entity";

export async function getShortByFilme(
    id_conteudo: number,
    tipo: TipoFaixa | null | undefined,
    resolucao: ResolucaoVideo | null | undefined,
    linguagem: string | null | undefined,
    flag_original: boolean | null | undefined,
    db: Pool | PoolClient = pool
)
{
    const select_clause = "SELECT id, id_conteudo, tipo, linguagem, resolucao, flag_original FROM faixas";
    const filter_values: any[] = [id_conteudo];
    const conditionals: string[] = ["id_conteudo = $1"];
    if (tipo)
    {
        filter_values.push(tipo);
        conditionals.push(`tipo = $${filter_values.length}`);
    }
    if (resolucao)
    {
        filter_values.push(resolucao);
        conditionals.push(`resolucao = $${filter_values.length}`);
    }
    if (linguagem)
    {
        filter_values.push(linguagem);
        conditionals.push(`linguagem = $${filter_values.length}`);
    }
    if (flag_original)
    {
        filter_values.push(flag_original);
        conditionals.push(`flag_original = $${filter_values.length}`);
    }
    const where_clause = ` WHERE ${conditionals.join(" AND ")}`;
    const query = select_clause + where_clause + ';';
    const result = await db.query(query, filter_values);
    const faixas = result.rows;
    return faixas;
}

export async function getShortByEpisodio(
    id_episodio: number,
    tipo: TipoFaixa | null | undefined,
    resolucao: ResolucaoVideo | null | undefined,
    linguagem: string | null | undefined,
    flag_original: boolean | null | undefined,
    db = pool
)
{
    const select_clause = "SELECT id, id_episodio, tipo, linguagem, resolucao, flag_original FROM faixas";
    const filter_values: any[] = [id_episodio];
    const conditionals: string[] = ["id_episodio = $1"];
    if (tipo)
    {
        filter_values.push(tipo);
        conditionals.push(`tipo = $${filter_values.length}`);
    }
    if (resolucao)
    {
        filter_values.push(resolucao);
        conditionals.push(`resolucao = $${filter_values.length}`);
    }
    if (linguagem)
    {
        filter_values.push(linguagem);
        conditionals.push(`linguagem = $${filter_values.length}`);
    }
    if (flag_original != null && flag_original != undefined)
    {
        filter_values.push(flag_original);
        conditionals.push(`flag_original = $${filter_values.length}`);
    }
    const where_clause = ` WHERE ${conditionals.join(" AND ")}`;
    const query = select_clause + where_clause + ';';
    const result = await db.query(query, filter_values);
    const faixas = result.rows;
    return faixas;
}

export async function getById(id: number, db: Pool | PoolClient = pool)
{
    const query = "SELECT * FROM faixas WHERE id = $1;";
    const values = [id];
    const result = await db.query(query, values);
    if (!result.rowCount)
    {
        return null;
    }
    const faixa = new Faixa(result.rows[0]);
    return faixa;
}

export async function create(obj: Faixa, db: Pool | PoolClient = pool)
{
    const query = `INSERT INTO faixas
    (id_conteudo, id_episodio, url_faixa, tipo, resolucao, flag_original)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;
    const values = [obj.id_conteudo, obj.id_episodio, obj.url_faixa, obj.tipo, obj.resolucao, obj.flag_original];
    try
    {
        const result = await db.query(query, values);
        const faixa = new Faixa(result.rows[0]);
        return faixa;
    }
    catch (err: any)
    {
        if (err.code === '23514' && err.constraint === 'faixa_referencia_unica')
        {
            const error: any = new Error("MEDIA_MULTIPLE_REFERENCE");
            error.code = 'MEDIA_MULTIPLE_REFERENCE';
            throw error;
        }
        else if (err.code === '23514' && err.constraint === 'faixa_resolucao_video')
        {
            const error: any = new Error("MEDIA_VIDEO_RESOLUTION");
            error.code = 'MEDIA_VIDEO_RESOLUTION';
            throw error;
        }
        else if (err.code === '23514' && err.constraint === 'faixa_original_audio')
        {
            const error: any = new Error("MEDIA_ORIGINAL_AUDIO");
            error.code = 'MEDIA_ORIGINAL_AUDIO';
            throw error;
        }
        else if (err.code === '23514' && err.constraint === 'faixa_linguagem')
        {
            const error: any = new Error("MEDIA_LANGUAGE");
            error.code = 'MEDIA_LANGUAGE';
            throw error;
        }
        else
        {
            throw err;
        }
    }
}

export async function update(id: number, fields: any, db: Pool | PoolClient = pool)
{
    const update_clause = "UPDATE faixas";
    const values = [];
    const updates = [];
    if (fields.url_faixa)
    {
        values.push(fields.url_faixa);
        updates.push(`url_faixa = $${values.length}`);
    }
    if (fields.tipo)
    {
        values.push(fields.tipo);
        updates.push(`tipo = $${values.length}`);
    }
    if (fields.resolucao)
    {
        values.push(fields.resolucao);
        updates.push(`resolucao = $${values.length}`);
    }
    if (fields.linguagem)
    {
        values.push(fields.linguagem);
        updates.push(`linguagem = $${values.length}`);
    }
    if (fields.flag_original != null && fields.flag_original != undefined)
    {
        values.push(fields.flag_original);
        updates.push(`flag_original = $${values.length}`);
    }
    values.push(id);
    const set_clause = ` SET ${updates.join(', ')}`;
    const where_clause = ` WHERE id = $${values.length}`;
    const return_clause = " RETURNING *;";
    try
    {   
        const query = update_clause + set_clause + where_clause + return_clause;
        const result = await db.query(query, values);
        if (!result.rowCount)
        {
            return null;
        }
        const faixa = new Faixa(result.rows[0]);
        return faixa;
    }
    catch (err: any)
    {
        if (err.code === '23514' && err.constraint === 'faixa_resolucao_video')
        {
            const error: any = new Error("MEDIA_VIDEO_RESOLUTION");
            error.code = 'MEDIA_VIDEO_RESOLUTION';
            throw error;
        }
        else if (err.code === '23514' && err.constraint === 'faixa_original_audio')
        {
            const error: any = new Error("MEDIA_ORIGINAL_AUDIO");
            error.code = 'MEDIA_ORIGINAL_AUDIO';
            throw error;
        }
        else if (err.code === '23514' && err.constraint === 'faixa_linguagem')
        {
            const error: any = new Error("MEDIA_LANGUAGE");
            error.code = 'MEDIA_LANGUAGE';
            throw error;
        }
        else
        {
            throw err;
        }
    }
}

export async function remove(id: number, db: Pool | PoolClient = pool)
{
    const query = "DELETE FROM faixas WHERE id = $1 RETURNING id";
    const values = [id];
    const deleted = await db.query(query, values);
    return deleted.rowCount;
}