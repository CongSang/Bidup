DROP TRIGGER IF EXISTS tr_onInsertBid;
DELIMITER $
CREATE TRIGGER tr_onInsertBid AFTER INSERT
ON bid 
FOR EACH ROW
BEGIN 
	CALL sp_onInsertOrUpdateBid(NEW.user_id, NEW.auction_id, NEW.money, NEW.bid_date);
END $

DROP TRIGGER IF EXISTS tr_onUpdateBid;
DELIMITER $
CREATE TRIGGER tr_onUpdateBid AFTER UPDATE
ON bid 
FOR EACH ROW
BEGIN 
	CALL sp_onInsertOrUpdateBid(NEW.user_id, NEW.auction_id, NEW.money, NEW.bid_date);
END $