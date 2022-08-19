DROP FUNCTION IF EXISTS fn_oldest_comment_notif;

DELIMITER $
CREATE FUNCTION fn_oldest_comment_notif(owner_id varchar(50))
RETURNS int
BEGIN
	DECLARE rs_id int;
	SET rs_id = (SELECT notif_id FROM (
		(SELECT target_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
			FROM
				(SELECT n.comment_id as target_id, n.user_id, n.type, n.is_read, COUNT(distinct r.user_id) as count, last_modified_user, last_modified, n.id as notif_id
					FROM comment_notif n JOIN react_comment r on n.comment_id=r.comment_id 
						JOIN (SELECT distinct n.comment_id, n.user_id, r.user_id as last_modified_user, r.created_date as last_modified
								FROM comment_notif n join react_comment r on n.comment_id=r.comment_id
								WHERE r.user_id != owner_id
								ORDER BY r.created_date) as sub
						ON r.comment_id=sub.comment_id
					WHERE n.user_id = owner_id AND n.type = 'REACT_COMMENT' AND r.user_id != owner_id
					GROUP BY r.comment_id) AS A
			JOIN user u on A.last_modified_user=u.id)
		UNION
        (SELECT target_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified, notif_id
		FROM
			(SELECT n.comment_id as target_id, n.user_id, n.type, n.is_read, COUNT(distinct c.user_id) as count, last_modified_user, last_modified, n.id as notif_id
				FROM comment_notif n JOIN comment c on n.comment_id=c.parent_id 
					JOIN (SELECT distinct n.comment_id, n.user_id, c.user_id as last_modified_user, c.comment_date as last_modified
							FROM comment_notif n join comment c on n.comment_id=c.parent_id
							WHERE c.user_id != owner_id
							ORDER BY c.comment_date) as sub
					ON c.parent_id=sub.comment_id
				WHERE n.user_id = owner_id AND n.type = 'REPLY_COMMENT' AND c.user_id != owner_id
				GROUP BY c.parent_id) AS A
		JOIN user u on A.last_modified_user=u.id)
	) AS R
	ORDER BY R.last_modified
    LIMIT 1);
    RETURN rs_id;
END
$