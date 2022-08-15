DROP TRIGGER IF EXISTS tr_comment_create_notif;
DELIMITER $
CREATE TRIGGER tr_comment_create_notif AFTER INSERT
ON comment 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
    DECLARE textMSG text;
	IF NEW.parent_id IS NULL THEN
		SET owner_id = (SELECT user_id from post WHERE id=NEW.post_id);
        IF owner_id != NEW.user_id THEN
			CALL sp_updateNotif(NEW.post_id, 'COMMENT_POST');
        END IF;
	ELSE
		SET owner_id = (SELECT user_id from comment WHERE id=NEW.parent_id);
		IF owner_id != NEW.user_id THEN
			CALL sp_updateCommentNotif(parent_id, 'REPLY_COMMENT');
		END IF;
	END IF;
END $

DROP TRIGGER IF EXISTS tr_comment_update_notif;
DELIMITER $
CREATE TRIGGER tr_comment_update_notif AFTER UPDATE
ON comment 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
	IF NEW.parent_id IS NULL THEN
		SET owner_id = (SELECT user_id from post WHERE id=NEW.post_id);
        IF owner_id != NEW.user_id THEN
			CALL sp_updateNotif(NEW.post_id, 'COMMENT_POST');
        END IF;
	ELSE
		SET owner_id = (SELECT user_id from comment WHERE id=NEW.parent_id);
		IF owner_id != NEW.user_id THEN
			CALL sp_updateCommentNotif(NEW.parent_id, 'REPLY_COMMENT');
		END IF;
	END IF;
END $
