INSERT INTO comments (users_id, content, created_at)
VALUES ($1, $2, now());