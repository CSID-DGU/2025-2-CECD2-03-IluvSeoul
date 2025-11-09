SELECT id,
       title,
       department_id,
       inquiry_user,
       inquiry_phone,
       inquiry_message,
       create_at,
       limit_at,
       update_at
FROM inquiry
ORDER BY id DESC