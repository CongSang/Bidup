DROP PROCEDURE IF EXISTS sp_updateNotif;

DELIMITER $
CREATE PROCEDURE sp_updateNotif(IN post_id int, IN type enum('REACT_POST', 'COMMENT_POST'))
BEGIN
	DECLARE owner_id varchar(50);
    SET owner_id = (SELECT user_id FROM post WHERE id=post_id LIMIT 1);
	IF NOT EXISTS (SELECT n.post_id FROM post_notif n WHERE n.post_id=post_id AND n.type=type)
    THEN
		INSERT INTO post_notif(post_id, user_id, type, is_read) VALUES(post_id, owner_id, type, false);
	ELSE 
		UPDATE post_notif
        SET is_read=false
        WHERE post_notif.post_id=post_id AND post_notif.type=type;
    END IF;
END $