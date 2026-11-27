export class CategoriaConteudo {
    private _id: number;
    private _id_categoria: number;
    private _id_conteudo: number;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_categoria: number;
        id_conteudo: number;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_categoria = obj.id_categoria;
        this._id_conteudo = obj.id_conteudo;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_categoria(): number { return this._id_categoria; }
    public set id_categoria(value: number) { this._id_categoria = value; }
    public get id_conteudo(): number { return this._id_conteudo; }
    public set id_conteudo(value: number) { this._id_conteudo = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
