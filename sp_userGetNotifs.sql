DROP PROCEDURE IF EXISTS sp_userGetNotifs;

DELIMITER $
CREATE PROCEDURE sp_userGetNotifs(IN user_id varchar(50))
BEGIN
	(SELECT post_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified
		FROM
			(SELECT n.post_id, n.user_id,  n.type, n.is_read, COUNT(distinct r.user_id) as count, last_modified_user, last_modified
				FROM csmdb.post_notif n JOIN react r on n.post_id=r.post_id 
					JOIN (SELECT distinct n.post_id, n.user_id as onwer_id, r.user_id as last_modified_user, r.created_date as last_modified
							FROM csmdb.post_notif n join react r on n.post_id=r.post_id
							WHERE r.user_id != user_id
							ORDER BY r.created_date DESC) as sub
					ON r.post_id=sub.post_id
				WHERE n.user_id = user_id AND n.type = 'REACT_POST' AND r.user_id != user_id
				GROUP BY r.post_id) AS A
		JOIN user u on A.last_modified_user=u.id)
	UNION
	(SELECT post_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified
		FROM
			(SELECT n.post_id, n.user_id,  n.type, n.is_read, COUNT(distinct c.user_id) as count, last_modified_user, last_modified
				FROM csmdb.post_notif n JOIN comment c on n.post_id=c.post_id 
					JOIN (SELECT distinct n.post_id, n.user_id as onwer_id, c.user_id as last_modified_user, c.comment_date as last_modified
							FROM csmdb.post_notif n join comment c on n.post_id=c.post_id
							WHERE c.user_id != user_id
							ORDER BY c.comment_date DESC) as sub
					ON c.post_id=sub.post_id
				WHERE n.user_id = user_id AND n.type = 'COMMENT_POST' AND c.user_id != user_id
				GROUP BY c.post_id) AS A
		JOIN user u on A.last_modified_user=u.id);
END $