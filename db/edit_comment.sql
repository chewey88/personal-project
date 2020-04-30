UPDATE comments
SET content = $1
WHERE comment_id = $2;