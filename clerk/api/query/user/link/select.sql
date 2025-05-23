SELECT link_type, link_id, user_id
FROM `user$link`
WHERE link_type=:link_type AND link_id=:link_id