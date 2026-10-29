import * as usuariosEntity from "./usuarios.entity";
import * as usuariosRepository from "./usuarios.repository";
import * as appErrors from "../errors/AppErrors";

async function _assertUsuarioExiste(id: number)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getById(id);
    if (!usuario)
    {
        throw new appErrors.NotFoundError("Usuário não encontrado.");
    }
    return usuario;
}
async function _assertEmailNaoRegistrado(email: string)
{
    const usuario: usuariosEntity.Usuario | null = await usuariosRepository.getByEmail(email);
    if (usuario != null)
    {
        throw new appErrors.UnprocessableEntityError("Já existe um usuário com esse email.");
    }
}
async function _assertLimiteTamanho(valor: string, chave: string)
{
    const maxLength: number = usuariosEntity.SIZE_CONSTRAINTS[chave];
    if (valor.length > maxLength)
    {
        throw new appErrors.UnprocessableEntityError(`${chave} só pode ter no máximo ${maxLength} caracteres.`);
    }    
}
export async function create(params: usuariosEntity.CreateUsuarioDTO, flag_admin: boolean)
{
    _assertLimiteTamanho(params.nome, "nome");
    _assertLimiteTamanho(params.email, "email");
    _assertEmailNaoRegistrado(params.email);
    const usuario: usuariosEntity.UsuarioResponseDTO = await usuariosRepository.create(params, flag_admin);
    return usuario;
}