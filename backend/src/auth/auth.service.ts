import jwt, {JwtPayload} from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../errors/AppErrors";
import { _assertUsuarioEmailExiste, _assertSenhaValida } from "../usuarios/usuarios.service";
import { loadConfig } from "../config";

interface UsuarioTokenPayload extends JwtPayload {
    id: number;
    email: string;
    nome: string;
}
const config = loadConfig({jwtSecret: true, databaseUrl: false});
export async function login(email: string, senha: string)
{
    try
    {
        const usuario = await _assertUsuarioEmailExiste(email);
        await _assertSenhaValida(senha, usuario.senha_hash);
        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, nome: usuario.nome},
            config.jwtSecret!,
            {expiresIn: "2h"}
        );
        return token;
    }
    catch (error)
    {
        if (error instanceof NotFoundError || error instanceof UnauthorizedError)
        {
            
            throw new UnauthorizedError("Email ou senha incorretos.");
        }
        else
        {
            throw error;
        }
    }
}
export function authenticate(token: string)
{
    try
    {
        const decoded = jwt.verify(token, config.jwtSecret!) as UsuarioTokenPayload;
        return decoded;
    }
    catch (error)
    {
        throw new UnauthorizedError("Token inválido ou expirado.");
    }
}