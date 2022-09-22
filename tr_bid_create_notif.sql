DROP TRIGGER IF EXISTS tr_bid_create_notif;
DELIMITER $
CREATE TRIGGER tr_bid_create_notif AFTER INSERT
ON bid 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
	DECLARE count int;
    DECLARE minimum decimal;
    DECLARE highest decimal;
    
    SELECT money 
    FROM bid b JOIN auction a ON b.auction_id=a.id
    WHERE b.user_id != NEW.user_id 
		AND b.auction_id = NEW.auction_id
    ORDER BY money DESC
    LIMIT 1
    INTO highest;
    
    SELECT minimum_compete FROM config INTO minimum;
    
    IF (NEW.money - highest) < minimum THEN 
		SIGNAL sqlstate '45001' set message_text = "Bid failed ! You must bid higher !"; 
    END IF;
    
	SET owner_id = (SELECT user_id from auction WHERE id=NEW.auction_id);
	CALL sp_updateCompeteAuctionNotif(NEW.user_id, NEW.auction_id);
    
	IF owner_id != NEW.user_id THEN
		CALL sp_updateAuctionNotif(NEW.auction_id);
        
        SELECT (SELECT COUNT(id) FROM post_notif WHERE user_id=owner_id GROUP BY user_id) INTO count;
		IF count > 30 THEN
			DELETE FROM post_notif
			WHERE id in (SELECT fn_oldest_post_notif(owner_id));
		END IF;
    END IF;
END $