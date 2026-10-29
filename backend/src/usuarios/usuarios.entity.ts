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
    flagAdministrador: boolean,
    criadoEm: Date,
}
export class Usuario
{
    private _id: number;
    private _nome: string;
    private _email: string;
    private _senhaHash: string;
    private _flagAdministrador: boolean;
    private _criadoEm: Date;

    constructor(nome: string, email: string, senhaHash: string, flagAdministrador: boolean, criadoEm?: Date, id?: number)
    {
        this._id = id ?? 0;
        this._criadoEm = criadoEm ?? new Date();
        this._nome = nome;
        this._email = email;
        this._senhaHash = senhaHash;
        this._flagAdministrador = flagAdministrador;
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

    // Getter e Setter para _senhaHash
    public get senhaHash(): string {
        return this._senhaHash;
    }

    public set senhaHash(value: string) {
        this._senhaHash = value;
    }

    // Getter e Setter para _flagAdministrador
    public get flagAdministrador(): boolean {
        return this._flagAdministrador;
    }

    public set flagAdministrador(value: boolean) {
        this._flagAdministrador = value;
    }

    // Getter e Setter para _criadoEm
    public get criadoEm(): Date {
        return this._criadoEm;
    }

    public set criadoEm(value: Date) {
        this._criadoEm = value;
    }
}