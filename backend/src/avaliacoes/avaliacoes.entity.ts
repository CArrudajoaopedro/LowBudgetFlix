export class Avaliacao {
    private _id: number;
    private _id_usuario: number;
    private _id_conteudo: number;
    private _nota: number;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_usuario: number;
        id_conteudo: number;
        nota: number;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_usuario = obj.id_usuario;
        this._id_conteudo = obj.id_conteudo;
        this._nota = obj.nota;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_usuario(): number { return this._id_usuario; }
    public set id_usuario(value: number) { this._id_usuario = value; }
    public get id_conteudo(): number { return this._id_conteudo; }
    public set id_conteudo(value: number) { this._id_conteudo = value; }
    public get nota(): number { return this._nota; }
    public set nota(value: number) { this._nota = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
