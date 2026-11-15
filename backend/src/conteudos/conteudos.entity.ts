export type TipoConteudo = "filme" | "serie";

export class Conteudo {
    private _id: number;
    private _titulo: string;
    private _sinopse: string;
    private _tipo: TipoConteudo;
    private _lancamento: Date;
    private _duracao: number | null;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        titulo: string;
        sinopse: string;
        tipo: TipoConteudo;
        lancamento: Date;
        duracao: number | null;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._titulo = obj.titulo;
        this._sinopse = obj.sinopse;
        this._tipo = obj.tipo;
        this._lancamento = obj.lancamento;
        this._duracao = obj.duracao;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get titulo(): string { return this._titulo; }
    public set titulo(value: string) { this._titulo = value; }
    public get sinopse(): string { return this._sinopse; }
    public set sinopse(value: string) { this._sinopse = value; }
    public get tipo(): TipoConteudo { return this._tipo; }
    public set tipo(value: TipoConteudo) { this._tipo = value; }
    public get lancamento(): Date { return this._lancamento; }
    public set lancamento(value: Date) { this._lancamento = value; }
    public get duracao(): number | null { return this._duracao; }
    public set duracao(value: number | null) { this._duracao = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
