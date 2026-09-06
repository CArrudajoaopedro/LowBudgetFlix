CREATE TABLE watch_history (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    episode_id INT NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    progress_seconds INT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_episode UNIQUE (user_id, episode_id)
);