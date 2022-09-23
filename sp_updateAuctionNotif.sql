DROP PROCEDURE IF EXISTS sp_updateAuctionNotif;

DELIMITER $
CREATE PROCEDURE sp_updateAuctionNotif(IN auction_id int)
BEGIN
	DECLARE count int;
	DECLARE owner_id varchar(50);
    
	SET owner_id = (SELECT user_id FROM auction WHERE id=auction_id LIMIT 1);
	IF NOT EXISTS (SELECT n.auction_id FROM post_notif n WHERE n.auction_id=auction_id AND n.type=type)
	THEN
		INSERT INTO post_notif(auction_id, user_id, type, is_read) VALUES(auction_id, owner_id, 'JOIN_AUCTION', false);
	ELSE 
		UPDATE post_notif
		SET is_read=false
		WHERE post_notif.auction_id=auction_id AND post_notif.type='JOIN_AUCTION';
	END IF;
	
    SELECT (SELECT COUNT(id) FROM post_notif WHERE user_id=owner_id GROUP BY user_id) INTO count;
	IF count > 30 THEN
		DELETE FROM post_notif
		WHERE id in (SELECT fn_oldest_post_notif(owner_id));
	END IF;  
END $
