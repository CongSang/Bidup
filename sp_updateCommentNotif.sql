DROP PROCEDURE IF EXISTS sp_updateCommentNotif;

DELIMITER $
CREATE PROCEDURE sp_updateCommentNotif(IN comment_id int, IN type enum('REACT_COMMENT', 'REPLY_COMMENT'))
BEGIN
	DECLARE owner_id varchar(50);
    SET owner_id = (SELECT user_id FROM comment WHERE id=comment_id LIMIT 1);
	IF NOT EXISTS (SELECT n.comment_id FROM comment_notif n WHERE n.comment_id=comment_id AND n.type=type)
    THEN
		INSERT INTO comment_notif(comment_id, user_id, type, is_read) VALUES(comment_id, owner_id, type, false);
	ELSE 
		UPDATE comment_notif
        SET is_read=false
        WHERE comment_notif.comment_id=comment_id AND comment_notif.type=type;
    END IF;
END $