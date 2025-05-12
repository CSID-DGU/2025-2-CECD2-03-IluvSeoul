SELECT id, inquiry_id, `name`, `path`, create_at
FROM inquiry$attachment
WHERE inquiry_id=:inquiry_id