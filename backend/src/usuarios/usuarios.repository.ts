import bcrypt from "bcrypt";
import {pool} from "../db";
import {Usuario, CreateUsuarioDTO} from "./usuarios.entity";

const salt_rounds: number = 10;

export async function create(params: CreateUsuarioDTO, flag_admin: boolean, db=pool)
{
    try
    {
        const query: string = "INSERT INTO usuarios (nome, email, senha_hash, flag_administrador) VALUES ($1, $2, $3, $4) RETURNING *";
        const salt = await bcrypt.genSalt(salt_rounds);
        const senha_hash: string = await bcrypt.hash(params.senha, salt);
        const result = await db.query(query, [params.nome, params.email, senha_hash, flag_admin]);
        const row = result.rows[0];
        const usuario: Usuario = new Usuario(row);
        return usuario;
    }
    catch (err: any)
    {
        if (err.code === '23505' && err.constraint === 'unique_usuario_email')
        {
            const domainError: any = new Error("EMAIL_ALREADY_EXISTS");
            domainError.code = 'EMAIL_ALREADY_EXISTS';
            throw domainError;
        }
        else
        {
            throw err;
        }
    }
}
export async function getById(id: number, db=pool)
{
    const query: string = "SELECT * FROM usuarios WHERE id = $1";
    const result = await db.query(query, [id]);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function getByEmail(email: string, db=pool)
{
    const query: string = "SELECT * FROM usuarios WHERE email = $1";
    const result = await db.query(query, [email]);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function getAll(db=pool) {
    const query: string = "SELECT * FROM usuarios";
    const result = await db.query(query);
    const usuarios: Usuario[] = result.rows.map((row) => new Usuario(row));
    return usuarios;
}
export async function updateNome(nome: string, id: number, db=pool)
{
    const query: string = "UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *";
    const result = await db.query(query, [nome, id]);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function updateSenha(senha: string, id: number, db=pool)
{
    const query: string = "UPDATE usuarios SET senha_hash = $1 WHERE id = $2 RETURNING *";
    const salt = await bcrypt.genSalt(salt_rounds);
    const senha_hash = await bcrypt.hash(senha, salt);
    const result = await db.query(query, [senha_hash, id]);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function updateFlagAdmin(id: number, db=pool)
{
    const query: string = "UPDATE usuarios SET flag_administrador = TRUE WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id]);
    if (!result.rowCount)
    {
        return null;
    }
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function remove(id: number, db=pool)
{
    const query: string = "DELETE FROM usuarios WHERE id = $1 RETURNING id";
    const deleted = await db.query(query, [id]);
    return deleted.rowCount;
}