CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateAuctionNotif`(IN auction_id int, IN type enum('JOIN_AUCTION'))
BEGIN
	DECLARE owner_id varchar(50);
    SET owner_id = (SELECT user_id FROM auction WHERE id=auction_id LIMIT 1);
	IF NOT EXISTS (SELECT n.auction_id FROM post_notif n WHERE n.auction_id=auction_id AND n.type=type)
    THEN
		INSERT INTO post_notif(auction_id, user_id, type, is_read) VALUES(auction_id, owner_id, type, false);
	ELSE 
		UPDATE post_notif
        SET is_read=false
        WHERE post_notif.auction_id=auction_id AND post_notif.type=type;
    END IF;
END