SELECT inquiry_id, message_id, sender_type, sender_id, summary, content, create_at
FROM inquiry$message
WHERE inquiry_id=:inquiry_id