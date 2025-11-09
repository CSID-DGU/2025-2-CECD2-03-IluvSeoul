DELETE FROM _department_tag
WHERE department_id = :department_id
  AND tag_id = :tag_id;