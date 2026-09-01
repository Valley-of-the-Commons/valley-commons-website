-- Updates / blog posts
CREATE TABLE IF NOT EXISTS updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    summary TEXT,
    body_md TEXT NOT NULL,
    cover_image_url TEXT,
    author VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_updates_slug ON updates(slug);
CREATE INDEX IF NOT EXISTS idx_updates_published_at ON updates(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_updates_published ON updates(published);
