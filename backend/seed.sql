-- ============================================================
-- LowBudgetFlix - Seed
-- ============================================================
--
--
-- Usuários:
--   senha: password123
--
-- Vídeos:
--   https://samplelib.com/ - vídeos públicos
--
-- Legendas:
--   https://github.com/1c7/vtt-test-file - legendas públicas
--
-- ============================================================

BEGIN;

-- ============================================================
-- LIMPA OS DADOS DA SEED ANTERIOR
-- ============================================================

TRUNCATE TABLE
    watch_history,
    subtitles,
    audio_tracks,
    episodes,
    contents,
    categories,
    users
RESTART IDENTITY CASCADE;


-- ============================================================
-- USERS
-- ============================================================

-- password123
--
-- bcrypt, cost 10
--
INSERT INTO users (
    user_name,
    email,
    password_hash
)
VALUES
(
    'Administrador',
    'admin@lowbudgetflix.com',
    '$2a$10$GrxNCkYblzAd4VI8VwInHe4DOvC20yMsKwxWy3Y6VUExcOSkXzCYe'
),
(
    'João Pedro',
    'joao@lowbudgetflix.com',
    '$2a$10$GrxNCkYblzAd4VI8VwInHe4DOvC20yMsKwxWy3Y6VUExcOSkXzCYe'
),
(
    'Maria Silva',
    'maria@lowbudgetflix.com',
    '$2a$10$GrxNCkYblzAd4VI8VwInHe4DOvC20yMsKwxWy3Y6VUExcOSkXzCYe'
),
(
    'Carlos Souza',
    'carlos@lowbudgetflix.com',
    '$2a$10$GrxNCkYblzAd4VI8VwInHe4DOvC20yMsKwxWy3Y6VUExcOSkXzCYe'
),
(
    'Ana Oliveira',
    'ana@lowbudgetflix.com',
    '$2a$10$GrxNCkYblzAd4VI8VwInHe4DOvC20yMsKwxWy3Y6VUExcOSkXzCYe'
);


-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (
    name,
    slug
)
VALUES
    ('Animação', 'animacao'),
    ('Ação', 'acao'),
    ('Aventura', 'aventura'),
    ('Comédia', 'comedia'),
    ('Drama', 'drama'),
    ('Ficção Científica', 'ficcao-cientifica'),
    ('Fantasia', 'fantasia'),
    ('Documentário', 'documentario');


-- ============================================================
-- CONTENTS
-- ============================================================

INSERT INTO contents (
    title,
    synopsis,
    content_kind,
    category_id,
    poster_url,
    release_date
)
VALUES

(
    'Traffic',
    'Test video of the road, and then of the traffic flow',
    'movie',
    (SELECT id FROM categories WHERE slug = 'documentario'),
    'https://samplelib.com/jpeg/sample-cmyk-400x300.jpg',
    '2008-05-30T00:00:00Z'
),

(
    'Park',
    'Test videos of parks',
    'series',
    (SELECT id FROM categories WHERE slug = 'documentario'),
    'https://samplelib.com/jpeg/sample-birch-400x300.jpg',
    '2003-03-21T00:00:00Z'
);


-- ============================================================
-- EPISODES
-- ============================================================

INSERT INTO episodes (
    content_id,
    season_number,
    episode_number,
    title,
    duration_seconds,
    video_url
)
VALUES

(
    (SELECT id FROM contents WHERE title = 'Traffic'),
    1,
    1,
    'Traffic',
    20,
    'https://samplelib.com/mp4/sample-20s-360p.mp4'
),

(
    (SELECT id FROM contents WHERE title = 'Park'),
    1,
    1,
    'First',
    5,
    'https://samplelib.com/mp4/sample-5s-360p.mp4'
),

(
    (SELECT id FROM contents WHERE title = 'Park'),
    1,
    2,
    'Second',
    10,
    'https://samplelib.com/mp4/sample-10s-360p.mp4'
);

-- ============================================================
-- AUDIOS
-- ============================================================

INSERT INTO audio_tracks (
    episode_id,
    language_code,
    audio_url,
    is_original
)
VALUES

(
    (SELECT id FROM episodes WHERE title = 'Traffic'),
    'pt-BR',
    'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a',
    TRUE
);

-- ============================================================
-- SUBTITLES
-- ============================================================

INSERT INTO subtitles (
    episode_id,
    language_code,
    subtitle_url
)
VALUES

(
    (SELECT id FROM episodes WHERE title = 'Traffic'),
    'en-US',
    'https://raw.githubusercontent.com/1c7/vtt-test-file/refs/heads/master/vtt%20files/7.%20Comment.vtt'
);
-- ============================================================
-- WATCH HISTORY
-- ============================================================

INSERT INTO watch_history (
    user_id,
    episode_id,
    progress_seconds,
    completed
)
VALUES

(
    (SELECT id FROM users WHERE email = 'joao@lowbudgetflix.com'),
    (SELECT id FROM episodes WHERE title = 'Traffic'),
    2,
    FALSE
),

(
    (SELECT id FROM users WHERE email = 'maria@lowbudgetflix.com'),
    (SELECT id FROM episodes WHERE title = 'First'),
    5,
    TRUE
),

(
    (SELECT id FROM users WHERE email = 'maria@lowbudgetflix.com'),
    (SELECT id FROM episodes WHERE title = 'Second'),
    1,
    FALSE
);


COMMIT;