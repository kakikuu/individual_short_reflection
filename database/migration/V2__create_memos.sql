CREATE TABLE memos (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    what_miss TEXT NOT NULL,
    why_miss TEXT NOT NULL,
    prevent_miss TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);