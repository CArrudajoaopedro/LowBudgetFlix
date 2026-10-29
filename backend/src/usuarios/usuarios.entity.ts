export interface CreateUsuarioDTO
{
    nome: string,
    email: string,
    senha: string,
}
export interface UpdateNomeUsuarioDTO
{
    nome: string,
}
export interface UpdateSenhaUsuarioDTO
{
    senha: string,
}
export interface UsuarioResponseDTO
{
    id: number,
    nome: string,
    email: string,
    flag_administrador: boolean,
    criado_em: Date,
}
export class Usuario
{
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senha_hash: string;
    private _flag_administrador: boolean;
    private _criado_em: Date;

    constructor(obj: any)
    {
        this._id = obj.id ?? 0;
        this._criado_em = obj.criado_em ?? new Date();
        this._nome = obj.nome;
        this._email = obj.email;
        this._senha_hash = obj.senha_hash;
        this._flag_administrador = obj.flag_administrador;
    }    

    // Getter e Setter para _id
    public get id(): number {
        return this._id;
    }

    // Getter e Setter para _nome
    public get nome(): string {
        return this._nome;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    // Getter e Setter para _email
    public get email(): string {
        return this._email;
    }

    // Getter e Setter para _senha_hash
    public get senha_hash(): string {
        return this._senha_hash;
    }

    public set senha_hash(value: string) {
        this._senha_hash = value;
    }

    // Getter e Setter para _flag_administrador
    public get flag_administrador(): boolean {
        return this._flag_administrador;
    }

    public set flag_administrador(value: boolean) {
        this._flag_administrador = value;
    }

    // Getter e Setter para _criado_em
    public get criado_em(): Date {
        return this._criado_em;
    }

    public set criado_em(value: Date) {
        this._criado_em = value;
    }
}
export const SIZE_CONSTRAINTS = Object({
    "nome": 150,
    "email": 350,
})