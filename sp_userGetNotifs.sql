DROP PROCEDURE IF EXISTS sp_userGetNotifs;

DELIMITER $
CREATE PROCEDURE sp_userGetNotifs(IN user_id varchar(50))
BEGIN
	SELECT * FROM (
		(SELECT target_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
			FROM
				(SELECT n.post_id as target_id, n.user_id,  n.type, n.is_read, COUNT(distinct r.user_id) as count, last_modified_user, last_modified, n.id as notif_id
					FROM csmdb.post_notif n JOIN react r on n.post_id=r.post_id 
						JOIN (SELECT distinct n.post_id, n.user_id, r.user_id as last_modified_user, r.created_date as last_modified
								FROM csmdb.post_notif n join react r on n.post_id=r.post_id
								WHERE r.user_id != user_id
								ORDER BY r.created_date DESC) as sub
						ON r.post_id=sub.post_id
					WHERE n.user_id = user_id AND n.type = 'REACT_POST' AND r.user_id != user_id
					GROUP BY r.post_id) AS A
			JOIN user u on A.last_modified_user=u.id)
		UNION
		(SELECT target_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
			FROM
				(SELECT n.post_id as target_id, n.user_id,  n.type, n.is_read, COUNT(distinct c.user_id) as count, last_modified_user, last_modified, n.id as notif_id
					FROM csmdb.post_notif n JOIN comment c on n.post_id=c.post_id 
						JOIN (SELECT distinct n.post_id, n.user_id, c.user_id as last_modified_user, c.comment_date as last_modified
								FROM csmdb.post_notif n join comment c on n.post_id=c.post_id
								WHERE c.user_id != user_id
								ORDER BY c.comment_date DESC) as sub
						ON c.post_id=sub.post_id
					WHERE n.user_id = user_id AND n.type = 'COMMENT_POST' AND c.user_id != user_id
					GROUP BY c.post_id) AS A
			JOIN user u on A.last_modified_user=u.id)
		UNION
        (SELECT target_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
			FROM
				(SELECT n.comment_id as target_id, n.user_id, n.type, n.is_read, COUNT(distinct r.user_id) as count, last_modified_user, last_modified, n.id as notif_id
					FROM comment_notif n JOIN react_comment r on n.comment_id=r.comment_id 
						JOIN (SELECT distinct n.comment_id, n.user_id, r.user_id as last_modified_user, r.created_date as last_modified
								FROM comment_notif n join react_comment r on n.comment_id=r.comment_id
								WHERE r.user_id != user_id
								ORDER BY r.created_date DESC) as sub
						ON r.comment_id=sub.comment_id
					WHERE n.user_id = user_id AND n.type = 'REACT_COMMENT' AND r.user_id != user_id
					GROUP BY r.comment_id) AS A
			JOIN user u on A.last_modified_user=u.id)
		UNION
		(SELECT post_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
			FROM
				(SELECT n.auction_id as post_id, n.user_id,  n.type, n.is_read, COUNT(distinct b.user_id) as count, last_modified_user, last_modified, n.id as notif_id
					FROM csmdb.post_notif n JOIN bid b on n.auction_id=b.auction_id 
						JOIN (SELECT distinct n.auction_id, n.user_id as onwer_id, b.user_id as last_modified_user, b.bid_date as last_modified
								FROM csmdb.post_notif n join bid b on n.auction_id=b.auction_id
								WHERE b.user_id != user_id
								ORDER BY b.bid_date DESC) as sub
						ON b.auction_id=sub.auction_id
					WHERE n.user_id = user_id AND n.type = 'JOIN_AUCTION' AND b.user_id != user_id
					GROUP BY b.auction_id) AS A
			JOIN user u on A.last_modified_user=u.id)
	) AS R
    ORDER BY r.last_modified DESC;
END $