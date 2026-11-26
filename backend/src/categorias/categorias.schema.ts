import * as z from "zod";

export const QueryCategoriaSchema = z.object({
    nome: z.string(),
    skip: z.coerce.number().int().default(0),
    limit: z.coerce.number().int().default(100)
})
export const CreateCategoriaSchema = z.object({
    nome: z.string().min(1).max(100)
})
export const UpdateCategoriaSchema = CreateCategoriaSchema;
export const ResponseCategoriaSchema = z.object({
    id: z.coerce.number().int(),
    nome: z.string()
})
export type CreateCategoriaDTO = z.infer<typeof CreateCategoriaSchema>;
export type UpdateCategoriaDTO = z.infer<typeof UpdateCategoriaSchema>;