INSERT INTO comments (users_id, content, created_at, comment_region)
VALUES ($1, $2, now(), $3);