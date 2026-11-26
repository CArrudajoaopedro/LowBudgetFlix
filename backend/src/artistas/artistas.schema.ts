import * as z from "zod";

export const QueryArtistaSchema = z.object({
    nome: z.string(),
    skip: z.coerce.number().int().default(0),
    limit: z.coerce.number().int().default(100)
}).partial()
export const CreateArtistaSchema = z.object({
    nome: z.string().min(1).max(100),
    nascimento: z.date().max(new Date()),
    nacionalidade: z.string().min(3).max(3),
    url_foto: z.url().max(2048).nullable()
})
export const UpdateArtistaSchema = CreateArtistaSchema.partial();
export const ResponseArtistaSchema = CreateArtistaSchema.extend({
    id: z.coerce.number().int()
})
export type CreateArtistaDTO = z.infer<typeof CreateArtistaSchema>;
export type UpdateArtistaDTO = z.infer<typeof UpdateArtistaSchema>;