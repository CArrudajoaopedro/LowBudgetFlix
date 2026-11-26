export class HistoricoVisualizacao {
    private _id: number;
    private _id_usuario: number;
    private _id_conteudo: number | null;
    private _id_episodio: number | null;
    private _progresso: number;
    private _atualizado_em: Date;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_usuario: number;
        id_conteudo?: number | null;
        id_episodio?: number | null;
        progresso: number;
        atualizado_em?: Date;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_usuario = obj.id_usuario;
        this._id_conteudo = obj.id_conteudo ?? null;
        this._id_episodio = obj.id_episodio ?? null;
        this._progresso = obj.progresso;
        this._atualizado_em = obj.atualizado_em ?? new Date();
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_usuario(): number { return this._id_usuario; }
    public set id_usuario(value: number) { this._id_usuario = value; }
    public get id_conteudo(): number | null { return this._id_conteudo; }
    public set id_conteudo(value: number | null) { this._id_conteudo = value; }
    public get id_episodio(): number | null { return this._id_episodio; }
    public set id_episodio(value: number | null) { this._id_episodio = value; }
    public get progresso(): number { return this._progresso; }
    public set progresso(value: number) { this._progresso = value; }
    public get atualizado_em(): Date { return this._atualizado_em; }
    public set atualizado_em(value: Date) { this._atualizado_em = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
