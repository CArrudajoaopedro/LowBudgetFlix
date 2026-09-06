CREATE TABLE IF NOT EXISTS subtitles (
    id SERIAL PRIMARY KEY,
    episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL, -- Ex: 'pt-BR', 'en-US'
    subtitle_url TEXT NOT NULL,
    CONSTRAINT unique_episode_subtitle UNIQUE (episode_id, language_code)
);

CREATE TABLE IF NOT EXISTS audio_tracks (
    id SERIAL PRIMARY KEY,
    episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    audio_url TEXT NOT NULL,
    is_original BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT unique_episode_audio UNIQUE (episode_id, language_code)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_only_one_default
ON audio_tracks (episode_id)
WHERE is_original = TRUE;