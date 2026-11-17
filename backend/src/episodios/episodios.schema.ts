import * as z from "zod";

export const EpisodioResponseSchema = z.object({
    id: z.int(),
    id_conteudo: z.int(),
    titulo: z.string(),
    sinopse: z.string(),
    lancamento: z.date(),
    duracao: z.int(),
    temporada: z.int(),
    numero: z.int(),
    criado_em: z.date()
});

export const CreateEpisodioSchema = z.object({
    id_conteudo: z.int(),
    titulo: z.string().min(1).max(200),
    sinopse: z.string().min(1).max(360),
    lancamento: z.coerce.date(),
    duracao: z.int().min(1),
    temporada: z.int().min(1),
    numero: z.int().min(1)
});

export const UpdateEpisodioSchema = CreateEpisodioSchema.partial().refine(
    ({id_conteudo, titulo, sinopse, lancamento, duracao, temporada, numero}) =>
        id_conteudo != undefined || titulo != undefined || sinopse != undefined || lancamento != undefined || duracao != undefined || temporada != undefined || numero,
    { message: "One of the fields must be defined" }
);

export const QueryEpisodioSchema = z.object({
    temporada: z.coerce.number().int().min(1),
    numero: z.coerce.number().int().min(1)
}).partial();

export const IdSchema = z.object({
    id: z.coerce.number().int()
})


export type QueryEpisodioDTO = z.infer<typeof QueryEpisodioSchema>;
export type CreateEpisodioDTO = z.infer<typeof CreateEpisodioSchema>;
export type UpdateEpisodioDTO = z.infer<typeof UpdateEpisodioSchema>;