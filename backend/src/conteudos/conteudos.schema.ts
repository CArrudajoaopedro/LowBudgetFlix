import * as z from "zod"

export const QueryConteudoSchema = z.object({
    titulo: z.string().min(1).max(200),
    sinopse: z.string().min(1).max(1000),
    tipo: z.enum(["filme", "serie"]),
    lancamentoInicial: z.date(),
    lancamentoFinal: z.date(),
    duracaoMinima: z.int(),
    duracaoMaxima: z.int(),
    skip: z.int().default(0),
    limit: z.int().max(1000).default(100)
}).partial();

export const CreateConteudoSchema = z.object({
    titulo: z.string().min(1).max(200),
    sinopse: z.string().min(1).max(1000),
    tipo: z.enum(["filme", "serie"]),
    lancamento: z.date(),
    duracao: z.int().min(1)
});

export const UpdateConteudoSchema = CreateConteudoSchema.partial().refine(
    ({titulo, sinopse, tipo, lancamento, duracao}) => 
        titulo !== undefined || sinopse !== undefined || tipo !== undefined || lancamento !== undefined || duracao !== undefined,
        { message: "One of the fields must be defined" }
);

export const ConteudoResponseSchema = z.object({
    id: z.int(),
    titulo: z.string(),
    sinopse: z.string(),
    tipo: z.enum(["filme", "serie"]),
    lancamento: z.date(),
    duracao: z.int(),
    criado_em: z.date()
})

export const IdSchema = z.object({
    id: z.int()
})

export type QueryConteudoDTO = z.infer<typeof QueryConteudoSchema>;
export type CreateConteudoDTO = z.infer<typeof CreateConteudoSchema>;
export type UpdateConteudoDTO = z.infer<typeof UpdateConteudoSchema>;