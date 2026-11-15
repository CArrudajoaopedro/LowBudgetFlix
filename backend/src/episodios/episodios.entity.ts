export class Episodio {
    private _id: number;
    private _id_conteudo: number;
    private _titulo: string;
    private _sinopse: string;
    private _lancamento: Date;
    private _duracao: number;
    private _temporada: number;
    private _numero: number;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_conteudo: number;
        titulo: string;
        sinopse: string;
        lancamento: Date;
        duracao: number;
        temporada: number;
        numero: number;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_conteudo = obj.id_conteudo;
        this._titulo = obj.titulo;
        this._sinopse = obj.sinopse;
        this._lancamento = obj.lancamento;
        this._duracao = obj.duracao;
        this._temporada = obj.temporada;
        this._numero = obj.numero;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_conteudo(): number { return this._id_conteudo; }
    public set id_conteudo(value: number) { this._id_conteudo = value; }
    public get titulo(): string { return this._titulo; }
    public set titulo(value: string) { this._titulo = value; }
    public get sinopse(): string { return this._sinopse; }
    public set sinopse(value: string) { this._sinopse = value; }
    public get lancamento(): Date { return this._lancamento; }
    public set lancamento(value: Date) { this._lancamento = value; }
    public get duracao(): number { return this._duracao; }
    public set duracao(value: number) { this._duracao = value; }
    public get temporada(): number { return this._temporada; }
    public set temporada(value: number) { this._temporada = value; }
    public get numero(): number { return this._numero; }
    public set numero(value: number) { this._numero = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
