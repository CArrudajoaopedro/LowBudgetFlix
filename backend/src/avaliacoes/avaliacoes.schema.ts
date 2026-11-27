import * as z from "zod";

export const CreateAvaliacaoSchema = z.object({
    nota: z.int().min(1).max(5)
})