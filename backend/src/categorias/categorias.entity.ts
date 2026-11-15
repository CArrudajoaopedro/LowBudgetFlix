export class Categoria {
    private _id: number;
    private _nome: string;
    private _criado_em: Date;

    constructor(obj: {
        id?: number;
        nome: string;
        criado_em?: Date;
    }) {
        this._id = obj.id ?? 0;
        this._nome = obj.nome;
        this._criado_em = obj.criado_em ?? new Date();
    }

    public get id(): number { return this._id; }
    public get nome(): string { return this._nome; }
    public set nome(value: string) { this._nome = value; }
    public get criado_em(): Date { return this._criado_em; }
    public set criado_em(value: Date) { this._criado_em = value; }
}
