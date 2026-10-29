import bcrypt from "bcrypt";
import {pool} from "../db";
import * as usuariosEntity from "./usuarios.entity";

const salt_rounds: number = 10;
const salt = await bcrypt.genSalt(salt_rounds);

export async function createUsuarioComum(params: usuariosEntity.CreateUsuarioDTO)
{
    const query: string = "INSERT INTO usuarios (nome, email, senha_hash, flag_administrador) VALUES ($1, $2, $3, $4)";
    const senha_hash: string = await bcrypt.hash(params.senha, salt);
    await pool.query(query, [params.nome, params.email, senha_hash, false]);
}
export async function createUsuarioAdmin(params: usuariosEntity.CreateUsuarioDTO)
{
    const query: string = "INSERT INTO usuarios (nome, email, senha_hash, flag_administrador) VALUES ($1, $2, $3, $4)";
    const senha_hash: string = await bcrypt.hash(params.senha, salt);
    await pool.query(query, [params.nome, params.email, senha_hash, true]);
}
export async function getUsuarioById(id: number)
{
    const query: string = "SELECT id, nome, email, flag_administrador, criado_em FROM usuarios WHERE id = $1";
    const result = await pool.query(query, [id]);
    const row = result.rows[0];
    if (!row)
    {
        return null;
    }
    return {
        id: row.id,
        nome: row.nome,
        email: row.email,
        flagAdministrador: row.flag_administrador,
        criadoEm: row.criado_em,
    };
}
export async function getAllUsuarios() {
    const query: string = "SELECT id, nome, email, flag_administrador, criado_em FROM usuarios";
    const resul = await pool.query(query);
    return resul;
}
export async function updateNomeUsuario(nome: string, id: number)
{
    const query: string = "UPDATE usuarios SET nome = $1 WHERE id = $2";
    await pool.query(query, [nome, id]);
    return await getUsuarioById(id);
}
export async function updateSenhaUsuario(senha: string, id: number)
{
    const query: string = "UPDATE usuarios SET senha_hash = $1 WHERE id = $2";
    const senha_hash = await bcrypt.hash(senha, salt);
    await pool.query(query, [senha_hash, id]);
    return await getUsuarioById(id);
}
export async function updateFlagAdminUsuario(id: number)
{
    const query: string = "UPDATE usuarios SET flag_administrador = TRUE WHERE id = $1";
    await pool.query(query, [id]);
    return await getUsuarioById(id);
}
export async function removeUsuario(id: number)
{
    const query: string = "DELETE FROM usuarios WHERE id = $1";
    await pool.query(query, [id]);
}