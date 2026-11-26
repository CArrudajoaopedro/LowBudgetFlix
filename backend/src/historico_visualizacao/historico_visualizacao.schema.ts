import * as z from "zod";

export const UpsertHistoricoSchema = z.object({
    progresso: z.coerce.number().int().nonnegative()
});
export type UpsertHistoricoDTO = z.infer<typeof UpsertHistoricoSchema>;