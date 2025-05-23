UPDATE `user`
SET login_count=login_count+1, last_device_id=:last_device_id
WHERE id=:id