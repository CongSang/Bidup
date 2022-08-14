DROP TRIGGER IF EXISTS tr_bid_create_notif;
DELIMITER $
CREATE TRIGGER  tr_bid_create_notif AFTER INSERT
ON bid 
FOR EACH ROW
BEGIN 
	DECLARE owner_id varchar(50);
	SET owner_id = (SELECT user_id from auction WHERE id=NEW.auction_id);
	IF owner_id != NEW.user_id THEN
		CALL sp_updateAuctionNotif(NEW.auction_id, 'JOIN_AUCTION');
    END IF;
END $