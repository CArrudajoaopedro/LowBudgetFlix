DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_type') THEN
        CREATE TYPE content_type AS ENUM ('movie', 'series');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS contents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    synopsis VARCHAR(500) NOT NULL,
    content_kind content_type NOT NULL,
    category_id INT REFERENCES categories(id),
    poster_url TEXT NOT NULL,
    release_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)