CREATE TABLE contents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    synopsis VARCHAR(500) NOT NULL,
    content_type ENUM('movie', 'series') NOT NULL,
    category_id REFERENCES categories(id),
    poster_url TEXT NOT NULL,
    release_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)