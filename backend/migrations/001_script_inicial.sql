BEGIN;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_conteudo') THEN
        CREATE TYPE public.tipo_conteudo AS ENUM ('filme', 'serie');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_faixa') THEN
        CREATE TYPE public.tipo_faixa AS ENUM ('audio', 'legenda', 'thumbnail', 'video');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'papel_credito') THEN
        CREATE TYPE public.papel_credito AS ENUM ('ator', 'diretor', 'roteirista');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'resolucao_video') THEN
        CREATE TYPE public.resolucao_video AS ENUM ('240p', '360p', '480p', '720p', '1080p', '1440p', '2160p', '4320p');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial NOT NULL,
    nome character varying(150) NOT NULL,
    email character varying(350) NOT NULL,
    senha_hash text NOT NULL,
    flag_administrador boolean NOT NULL DEFAULT False,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_usuario PRIMARY KEY (id),
    CONSTRAINT unique_usuario_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.conteudos
(
    id serial NOT NULL,
    titulo character varying(200) NOT NULL,
    sinopse character varying(1000) NOT NULL,
    tipo public.tipo_conteudo NOT NULL,
    lancamento date NOT NULL,
    duracao integer,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_conteudo PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.episodios
(
    id serial NOT NULL,
    id_conteudo integer NOT NULL,
    titulo character varying(200) NOT NULL,
    sinopse character varying(360) NOT NULL,
    lancamento date NOT NULL,
    duracao integer NOT NULL,
    temporada smallint NOT NULL,
    numero smallint NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_episodio PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.faixas
(
    id serial NOT NULL,
    id_conteudo integer,
    id_episodio integer,
    url_faixa character varying(2048) NOT NULL,
    linguagem character varying(35),
    tipo public.tipo_faixa NOT NULL,
    resolucao public.resolucao_video,
    flag_original boolean DEFAULT False,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_faixa PRIMARY KEY (id),
    CONSTRAINT faixa_referencia_unica CHECK (
        (id_episodio IS NULL AND id_conteudo IS NOT NULL) OR (id_episodio IS NOT NULL AND id_conteudo IS NULL)
        )
);

CREATE TABLE IF NOT EXISTS public.artistas
(
    id serial NOT NULL,
    nome character varying(100) NOT NULL,
    nascimento date NOT NULL,
    nacionalidade character(3) NOT NULL,
    foto bytea NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_artista PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.historico_visualizacao
(
    id serial NOT NULL,
    id_usuario integer NOT NULL,
    id_conteudo integer,
    id_episodio integer,
    progresso integer NOT NULL,
    atualizado_em timestamptz NOT NULL DEFAULT now(),
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_id_historico PRIMARY KEY (id),
    CONSTRAINT historico_unique_usuario_conteudo UNIQUE (id_usuario, id_conteudo),
    CONSTRAINT historico_unique_usuario_episodio UNIQUE (id_usuario, id_episodio),
    CONSTRAINT historico_referencia_unica CHECK (
        (id_episodio IS NULL AND id_conteudo IS NOT NULL) OR (id_episodio IS NOT NULL AND id_conteudo IS NULL)
        )
);

CREATE TABLE IF NOT EXISTS public.creditos
(
    id serial NOT NULL,
    id_artista integer NOT NULL,
    id_conteudo integer NOT NULL,
    papel public.papel_credito NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_credito PRIMARY KEY (id),
    CONSTRAINT credito_unique_artista_conteudo_papel UNIQUE (id_artista, id_conteudo, papel)
);

CREATE TABLE IF NOT EXISTS public.avaliacoes
(
    id serial NOT NULL,
    id_usuario integer NOT NULL,
    id_conteudo integer NOT NULL,
    nota integer NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_avaliacao PRIMARY KEY (id),
    CONSTRAINT nota_cinco_estrelas CHECK (nota >= 1 AND nota <= 5),
    CONSTRAINT avaliacao_unique_usuario_conteudo UNIQUE (id_usuario, id_conteudo)
);

CREATE TABLE IF NOT EXISTS public.categorias
(
    id serial NOT NULL,
    nome character varying(100) NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_categoria PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.categorias_conteudos
(
    id serial NOT NULL,
    id_categoria integer NOT NULL,
    id_conteudo integer NOT NULL,
    criado_em timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT pk_categoria_conteudo PRIMARY KEY (id),
    CONSTRAINT unique_categoria_conteudo UNIQUE (id_categoria, id_conteudo)
);

ALTER TABLE IF EXISTS public.episodios
    ADD CONSTRAINT fk_episodio_conteudo FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.faixas
    ADD CONSTRAINT fk_faixa_conteudo FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.faixas
    ADD CONSTRAINT fk_faixa_episodio FOREIGN KEY (id_episodio)
    REFERENCES public.episodios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.historico_visualizacao
    ADD CONSTRAINT fk_historico_usuario FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.historico_visualizacao
    ADD CONSTRAINT fk_historico_conteudo FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.historico_visualizacao
    ADD CONSTRAINT fk_historico_episodio FOREIGN KEY (id_episodio)
    REFERENCES public.episodios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.creditos
    ADD CONSTRAINT fk_credito_artista FOREIGN KEY (id_artista)
    REFERENCES public.artistas (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.creditos
    ADD CONSTRAINT fk_credito_conteudo FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.avaliacoes
    ADD CONSTRAINT fk_avalacao_usuario FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.avaliacoes
    ADD CONSTRAINT fk_avaliacao_conteudo FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.categorias_conteudos
    ADD CONSTRAINT fk_categoria FOREIGN KEY (id_categoria)
    REFERENCES public.categorias (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.categorias_conteudos
    ADD CONSTRAINT fk_conteudo_categoria FOREIGN KEY (id_conteudo)
    REFERENCES public.conteudos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;