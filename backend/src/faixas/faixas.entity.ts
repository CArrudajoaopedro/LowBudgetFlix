export type TipoFaixa = "audio" | "legenda" | "thumbnail" | "video";
export type ResolucaoVideo =
    | "240p"
    | "360p"
    | "480p"
    | "720p"
    | "1080p"
    | "1440p"
    | "2160p"
    | "4320p";

export class Faixa {
    private _id: number;
    private _id_conteudo: number | null;
    private _id_episodio: number | null;
    private _url_faixa: string;
    private _linguagem: string | null;
    private _tipo: TipoFaixa;
    private _resolucao: ResolucaoVideo | null;
    private _flag_original: boolean | null;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_conteudo: number | null;
        id_episodio: number | null;
        url_faixa: string;
        linguagem: string | null;
        tipo: TipoFaixa;
        resolucao: ResolucaoVideo | null;
        flag_original?: boolean | null;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_conteudo = obj.id_conteudo;
        this._id_episodio = obj.id_episodio;
        this._url_faixa = obj.url_faixa;
        this._linguagem = obj.linguagem;
        this._tipo = obj.tipo;
        this._resolucao = obj.resolucao;
        this._flag_original = obj.flag_original ?? false;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_conteudo(): number | null { return this._id_conteudo; }
    public set id_conteudo(value: number | null) { this._id_conteudo = value; }
    public get id_episodio(): number | null { return this._id_episodio; }
    public set id_episodio(value: number | null) { this._id_episodio = value; }
    public get url_faixa(): string { return this._url_faixa; }
    public set url_faixa(value: string) { this._url_faixa = value; }
    public get linguagem(): string | null { return this._linguagem; }
    public set linguagem(value: string | null) { this._linguagem = value; }
    public get tipo(): TipoFaixa { return this._tipo; }
    public set tipo(value: TipoFaixa) { this._tipo = value; }
    public get resolucao(): ResolucaoVideo | null { return this._resolucao; }
    public set resolucao(value: ResolucaoVideo | null) { this._resolucao = value; }
    public get flag_original(): boolean | null { return this._flag_original; }
    public set flag_original(value: boolean | null) { this._flag_original = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
