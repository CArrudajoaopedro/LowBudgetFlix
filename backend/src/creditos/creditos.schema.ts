import * as z from "zod";

export const CreateCreditoSchema = z.object({
    id_artista: z.int(),
    papel: z.enum(["ator", "diretor", "roteirista"])
})