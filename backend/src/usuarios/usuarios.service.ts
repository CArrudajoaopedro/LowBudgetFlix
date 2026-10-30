import bcrypt from "bcrypt";
import * as usuariosEntity from "./usuarios.entity";
import * as usuariosRepository from "./usuarios.repository";
import * as appErrors from "../errors/AppErrors";

async function _assertUsuarioIdExiste(id: number)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getById(id);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuário não encontrado.");
    }
    return usuario;
}
export async function _assertUsuarioEmailExiste(email: string)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getByEmail(email);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuário não encontrado.");
    }
    return usuario;
}
async function _assertUsuarioEmailNaoExiste(email: string)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getByEmail(email);
    if (usuario != null)
    {
        throw new appErrors.UnprocessableEntityError("Já existe um usuário com esse email.");
    }
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
    await _assertUsuarioEmailNaoExiste(params.email);
    const usuario = await usuariosRepository.create(params, flag_admin);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function getById(id: number)
{
    const usuario = await _assertUsuarioIdExiste(id);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function getByEmail(email: string)
{
    const usuario = await _assertUsuarioEmailExiste(email);
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
    await _assertUsuarioIdExiste(id);
    const usuario = await usuariosRepository.updateNome(nome, id);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function updateSenha(senhaAntiga: string, senhaNova: string, id: number)
{
    const usuarioSenhaAntiga = await _assertUsuarioIdExiste(id);
    await _assertSenhaValida(senhaAntiga, usuarioSenhaAntiga.senha_hash);
    const usuario = await usuariosRepository.updateSenha(senhaNova, id);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function updateFlagAdmin(id: number)
{
    await _assertUsuarioIdExiste(id);
    const usuario = await usuariosRepository.updateFlagAdmin(id);
    const usuarioDTO = usuariosEntity.UsuarioResponseSchema.parse(usuario)
    return usuarioDTO;
}
export async function remove(id: number)
{
    const usuario = await _assertUsuarioIdExiste(id);
    if (usuario.flag_administrador)
    {
        throw new appErrors.ForbiddenError("Não é possível deletar usuário administrador.");
    }
    await usuariosRepository.remove(id);
}