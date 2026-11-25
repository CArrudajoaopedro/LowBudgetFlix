import * as z from "zod";
const zResolucaoVideo = z.enum(['240p', '360p', '480p', '720p', '1080p', '1440p', '2160p', '4320p']);
const zTipoFaixa = z.enum(['audio', 'legenda', 'thumbnail', 'video']);
const zUrlFaixa = z.string().min(1).max(2048);
const zLinguagem = z.string().min(1).max(35);
const CreateFaixaSchema = z.object({
    url_faixa: zUrlFaixa
});
const CreateFaixaSchemaLinguagem = CreateFaixaSchema.extend({
    linguagem: zLinguagem
});
export const CreateAudioSchema = CreateFaixaSchemaLinguagem.extend({
    flag_original: z.boolean()
});
export const CreateLegendaSchema = CreateFaixaSchemaLinguagem;
export const CreateVideoSchema = CreateFaixaSchema.extend({
    resolucao: zResolucaoVideo
})
export const CreateThumbnailSchema = CreateFaixaSchema;
export const UpdateFaixaSchema = z.object({
    url_faixa: zUrlFaixa,
    linguagem: zLinguagem,
    flag_original: z.boolean(),
    resolucao: zResolucaoVideo
}).partial().strict();
export const BaseFaixaShortSchema = z.object({
    id: z.coerce.number().int(),
    tipo: zTipoFaixa,
    linguagem: zLinguagem.nullable(),
    flag_original: z.boolean().nullable(),
    resolucao: zResolucaoVideo.nullable()
});
export const ShortResponseFaixaFilmeSchema = BaseFaixaShortSchema.extend({
    id_conteudo: z.coerce.number().int()
})
export const ShortResponseFaixaEpisodioSchema = BaseFaixaShortSchema.extend({
    id_episodio: z.coerce.number().int()
})
export const FullResponseFaixaSchema = BaseFaixaShortSchema.extend({
    url_faixa: zUrlFaixa,
    id_conteudo: z.coerce.number().int().nullable(),
    id_episodio: z.coerce.number().int().nullable()
})
export const QueryFaixaSchema = BaseFaixaShortSchema.extend({}).partial();
export type CreateAudioDTO = z.infer<typeof CreateAudioSchema>;
export type CreateVideoDTO = z.infer<typeof CreateVideoSchema>;
export type CreateLegendaDTO = z.infer<typeof CreateLegendaSchema>;
export type CreateThumbnailDTO = z.infer<typeof CreateThumbnailSchema>;
export type UpdateFaixaDTO = z.infer<typeof UpdateFaixaSchema>;
export type QueryFaixaDTO = z.infer<typeof QueryFaixaSchema>;