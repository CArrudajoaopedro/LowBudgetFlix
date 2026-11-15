export type PapelCredito = "ator" | "diretor" | "roteirista";

export class Credito {
    private _id: number;
    private _id_artista: number;
    private _id_conteudo: number;
    private _papel: PapelCredito;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        id_artista: number;
        id_conteudo: number;
        papel: PapelCredito;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._id_artista = obj.id_artista;
        this._id_conteudo = obj.id_conteudo;
        this._papel = obj.papel;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get id_artista(): number { return this._id_artista; }
    public set id_artista(value: number) { this._id_artista = value; }
    public get id_conteudo(): number { return this._id_conteudo; }
    public set id_conteudo(value: number) { this._id_conteudo = value; }
    public get papel(): PapelCredito { return this._papel; }
    public set papel(value: PapelCredito) { this._papel = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
