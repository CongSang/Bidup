DROP TRIGGER IF EXISTS tr_react_create_notif;
DELIMITER $
CREATE TRIGGER tr_react_create_notif AFTER INSERT
ON react 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
	DECLARE count int;
    
    SET owner_id = (SELECT user_id from post WHERE id=NEW.post_id);
    IF owner_id != NEW.user_id THEN
		CALL sp_updateNotif(NEW.post_id, 'REACT_POST');
        
		SELECT (SELECT COUNT(id) FROM post_notif WHERE user_id=owner_id GROUP BY user_id) INTO count;
		IF count > 30 THEN
			DELETE FROM post_notif
			WHERE id in (SELECT fn_oldest_post_notif(owner_id));
		END IF;
	END IF;
END $

DROP TRIGGER IF EXISTS tr_react_update_notif;

DELIMITER $
CREATE TRIGGER tr_react_update_notif AFTER UPDATE
ON react 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
    SET owner_id = (SELECT user_id from post WHERE id=NEW.post_id);
    IF owner_id != NEW.user_id THEN
		CALL sp_updateNotif(NEW.post_id, 'REACT_POST');
	END IF;
END $