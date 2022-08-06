DROP PROCEDURE IF EXISTS sp_userGetNotifs;

DELIMITER $
CREATE PROCEDURE sp_userGetNotifs(IN user_id varchar(50))
BEGIN
	(SELECT post_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified
	FROM (SELECT A.post_id, type, is_read, count, last_modified_user, last_modified
		FROM
			(SELECT n.post_id, n.user_id,  n.type, n.is_read, COUNT(r.user_id) as count
			FROM csmdb.post_notif n join react r on n.post_id=r.post_id
			WHERE n.user_id = 'abcd' AND n.type = 'REACT_POST'
			GROUP BY r.post_id) AS A
		JOIN
			(SELECT n.user_id, r.user_id as last_modified_user, r.created_date as last_modified
			FROM csmdb.post_notif n join react r on n.post_id=r.post_id
			WHERE n.user_id = 'abcd'
			ORDER BY r.created_date DESC
			LIMIT 1) AS B
		ON A.user_id = B.user_id) AS C
	JOIN user u on last_modified_user=u.id)
	UNION
	(SELECT post_id, type, is_read, count, u.firstname as last_modified_name, u.avatar as last_modified_avatar, last_modified
	FROM (SELECT A.post_id, type, is_read, count, last_modified_user, last_modified
		FROM
			(SELECT n.post_id, n.user_id, n.type, n.is_read, COUNT(c.user_id) as count
			FROM csmdb.post_notif n join comment c on n.post_id=c.post_id
			WHERE n.user_id = 'abcd' AND n.type = 'COMMENT_POST'
			GROUP BY c.post_id) AS A
		JOIN
			(SELECT n.user_id, c.user_id as last_modified_user, c.comment_date as last_modified
			FROM csmdb.post_notif n join comment c on n.post_id=c.post_id
			WHERE n.user_id = 'abcd'
			ORDER BY c.comment_date DESC
			LIMIT 1) AS B
		ON A.user_id = B.user_id) AS C
	JOIN user u on last_modified_user=u.id);
END $