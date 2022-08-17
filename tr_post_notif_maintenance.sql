DROP PROCEDURE IF EXISTS sp_delete_oldest

DELIMITER $
CREATE PROCEDURE sp_delete_oldest(IN owner_id varchar(50))
BEGIN
	DECLARE count int;
    SELECT (SELECT COUNT(id) FROM post_notif WHERE user_id=owner_id GROUP BY user_id) INTO count;
    IF count > 9 THEN
		DELETE FROM post_notif
        WHERE id in (SELECT fn_oldest_notif(owner_id));
    END IF;
END
$
