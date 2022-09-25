DROP PROCEDURE IF EXISTS sp_onInsertOrUpdateBid;

DELIMITER $
CREATE PROCEDURE sp_onInsertOrUpdateBid(IN userId varchar(50), IN auctionId int, IN moneyBid decimal)
BEGIN
	DECLARE owner_id varchar(50);
    DECLARE minimum decimal;
    DECLARE highest decimal;
    
    SELECT money 
    FROM bid b JOIN auction a ON b.auction_id=a.id
    WHERE b.user_id != userId 
		AND b.auction_id = auctionId
    ORDER BY money DESC
    LIMIT 1
    INTO highest;
    
    SET minimum = CAST((SELECT value FROM config WHERE name='minimum_compete') AS DECIMAL);
    
    IF (moneyBid - highest) < minimum THEN 
		SIGNAL sqlstate '45001' set message_text = "Bid failed ! You must bid higher !"; 
    END IF;
    
	CALL sp_updateCompeteAuctionNotif(userId, auctionId);
    
	CALL sp_updateAuctionNotif(auctionId);
END $