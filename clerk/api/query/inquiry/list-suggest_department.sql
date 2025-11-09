SELECT inquiry_id, suggest_department_id
FROM inquiry$suggest_department
WHERE inquiry_id = :inquiry_id
ORDER BY `order`;