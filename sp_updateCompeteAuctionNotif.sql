DROP PROCEDURE IF EXISTS sp_updateCompeteAuctionNotif;

DELIMITER $
CREATE PROCEDURE sp_updateCompeteAuctionNotif(IN userId varchar(50), IN auction_id int)
BEGIN
	DECLARE owner_id varchar(50);
    DECLARE done boolean default false;
    DECLARE cursor_list CURSOR FOR
		SELECT b.user_id
        FROM bid b
        WHERE b.auction_id=auction_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
	OPEN cursor_list;
	REPEAT
		FETCH cursor_list INTO owner_id;
		IF NOT done 
		THEN
			IF NOT EXISTS (SELECT n.auction_id 
				FROM post_notif n 
                WHERE n.auction_id=auction_id 
					AND n.type='COMPETE_AUCTION'
                    AND user_id=owner_id
                    AND user_id!=userId)
			THEN
				INSERT INTO post_notif(auction_id, user_id, type, is_read) VALUES(auction_id, owner_id, 'COMPETE_AUCTION', false);
			ELSE 
				UPDATE post_notif
				SET is_read=false
				WHERE post_notif.auction_id=auction_id 
					AND post_notif.type='COMPETE_AUCTION'
                    AND user_id=owner_id
                    AND user_id!=userId;
			END IF;
		END IF;
	UNTIL done END REPEAT;
	CLOSE cursor_list;
END $