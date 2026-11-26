export class Artista {
    private _id: number;
    private _nome: string;
    private _nascimento: Date;
    private _nacionalidade: string;
    private _url_foto: string | null;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        nome: string;
        nascimento: Date;
        nacionalidade: string;
        url_foto?: string | null;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._nome = obj.nome;
        this._nascimento = obj.nascimento;
        this._nacionalidade = obj.nacionalidade;
        this._url_foto = obj.url_foto ?? null;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get nome(): string { return this._nome; }
    public set nome(value: string) { this._nome = value; }
    public get nascimento(): Date { return this._nascimento; }
    public set nascimento(value: Date) { this._nascimento = value; }
    public get nacionalidade(): string { return this._nacionalidade; }
    public set nacionalidade(value: string) { this._nacionalidade = value; }
    public get url_foto(): string | null { return this._url_foto; }
    public set url_foto(value: string | null) { this._url_foto = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
