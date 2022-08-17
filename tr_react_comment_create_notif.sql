DROP TRIGGER IF EXISTS tr_react_comment_create_notif;
DELIMITER $
CREATE TRIGGER tr_react_comment_create_notif AFTER INSERT
ON react_comment 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
	DECLARE count int;
    
    SET owner_id = (SELECT user_id from comment WHERE id=NEW.comment_id);
    IF owner_id != NEW.user_id THEN
		CALL sp_updateCommentNotif(NEW.comment_id, 'REACT_COMMENT');
        
        SELECT (SELECT COUNT(id) FROM post_notif WHERE user_id=owner_id GROUP BY user_id) INTO count;
		IF count > 20 THEN
			DELETE FROM comment_notif
			WHERE id in (SELECT fn_oldest_comment_notif(owner_id));
		END IF;
	END IF;
END $

DROP TRIGGER IF EXISTS tr_react_comment_update_notif;
DELIMITER $
CREATE TRIGGER tr_react_comment_update_notif AFTER UPDATE
ON react_comment 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
    SET owner_id = (SELECT user_id from comment WHERE id=NEW.comment_id);
    IF owner_id != NEW.user_id THEN
		CALL sp_updateCommentNotif(NEW.comment_id, 'REACT_COMMENT');
	END IF;
END $