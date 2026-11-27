import bcrypt from "bcrypt";
import * as usuariosEntity from "./usuarios.entity";
import * as usuariosRepository from "./usuarios.repository";
import * as appErrors from "../errors/AppErrors";
import { transaction } from "../db";

export async function _assertUsuarioEmailExiste(email: string)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getByEmail(email);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuário não encontrado.");
    }
    return usuario;
}
export async function _assertSenhaValida(senha: string, hash: string)
{
    const valida: boolean = await bcrypt.compare(senha, hash);
    if (!valida)
    {
        throw new appErrors.UnauthorizedError("Senha incorreta.");
    }
}
export async function create(params: usuariosEntity.CreateUsuarioDTO, flag_admin: boolean)
{
    try
    {
        const usuario = await usuariosRepository.create(params, flag_admin);
        const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
        return usuarioDTO;
    }
    catch (err: any)
    {
        if (err.code === 'EMAIL_ALREADY_EXISTS')
        {
            throw new appErrors.ConflictError("Já existe um usuário com esse e-mail.");
        }
        else
        {
            throw err;
        }
    }
}
export async function getById(id: number)
{
    const usuario = await usuariosRepository.getById(id);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario);
    return usuarioDTO;
}
export async function getByEmail(email: string)
{
    const usuario = await usuariosRepository.getByEmail(email);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function getAll()
{
    const usuarios = await usuariosRepository.getAll();
    const usuariosDTOs = usuarios.map((user) => usuariosEntity.UsuarioResponseSchema.parse(user));
    return usuariosDTOs;
}
export async function updateNome(nome: string, id: number)
{
    const usuario = await usuariosRepository.updateNome(nome, id);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function updateSenha(senhaAntiga: string, senhaNova: string, id: number)
{
    const usuarioSenhaAntiga = await usuariosRepository.getById(id);
    if (!usuarioSenhaAntiga)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    await _assertSenhaValida(senhaAntiga, usuarioSenhaAntiga.senha_hash);
    const usuario = await usuariosRepository.updateSenha(senhaNova, id);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function updateFlagAdmin(id: number)
{
    const usuario = await usuariosRepository.updateFlagAdmin(id);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
async function _remove(id: number, db: any)
{
    const usuario = await usuariosRepository.getById(id, db);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuario não encontrado");
    }
    if (usuario.flag_administrador)
    {
        throw new appErrors.ForbiddenError("Não é possível deletar usuário administrador.");
    }
    await usuariosRepository.remove(id, db);
}

export async function remove(id: number)
{
    await transaction(_remove, id);
}