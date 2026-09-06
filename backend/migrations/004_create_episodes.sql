CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    content_id INT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    season_number INT DEFAULT 1,
    episode_number INT DEFAULT 1,
    title VARCHAR(150) NOT NULL,
    duration_seconds INT NOT NULL CHECK (duration_seconds > 0),
    video_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);