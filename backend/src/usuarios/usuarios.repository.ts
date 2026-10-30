import bcrypt from "bcrypt";
import {pool} from "../db";
import {Usuario, CreateUsuarioDTO} from "./usuarios.entity";

const salt_rounds: number = 10;

export async function create(params: CreateUsuarioDTO, flag_admin: boolean)
{
    const query: string = "INSERT INTO usuarios (nome, email, senha_hash, flag_administrador) VALUES ($1, $2, $3, $4) RETURNING *";
    const salt = await bcrypt.genSalt(salt_rounds);
    const senha_hash: string = await bcrypt.hash(params.senha, salt);
    const result = await pool.query(query, [params.nome, params.email, senha_hash, flag_admin]);
    const row = result.rows[0];
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function getById(id: number)
{
    const query: string = "SELECT * FROM usuarios WHERE id = $1";
    const result = await pool.query(query, [id]);
    const row = result.rows[0];
    if (!row)
    {
        return null;
    }
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function getByEmail(email: string)
{
    const query: string = "SELECT * FROM usuarios WHERE email = $1";
    const result = await pool.query(query, [email]);
    const row = result.rows[0];
    if (!row)
    {
        return null;
    }
    const usuario: Usuario = new Usuario(row);
    return usuario;
}
export async function getAll() {
    const query: string = "SELECT * FROM usuarios";
    const result = await pool.query(query);
    const usuarios: Usuario[] = result.rows.map((row) => new Usuario(row));
    return usuarios;
}
export async function updateNome(nome: string, id: number)
{
    const query: string = "UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [nome, id]);
    const usuario: Usuario = new Usuario(result.rows[0]);
    return usuario;
}
export async function updateSenha(senha: string, id: number)
{
    const query: string = "UPDATE usuarios SET senha_hash = $1 WHERE id = $2 RETURNING *";
    const salt = await bcrypt.genSalt(salt_rounds);
    const senha_hash = await bcrypt.hash(senha, salt);
    const result = await pool.query(query, [senha_hash, id]);
    const usuario: Usuario = new Usuario(result.rows[0]);
    return usuario;
}
export async function updateFlagAdmin(id: number)
{
    const query: string = "UPDATE usuarios SET flag_administrador = TRUE WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    const usuario: Usuario = new Usuario(result.rows[0]);
    return usuario;
}
export async function remove(id: number)
{
    const query: string = "DELETE FROM usuarios WHERE id = $1";
    await pool.query(query, [id]);
}