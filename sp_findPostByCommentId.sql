DROP PROCEDURE IF EXISTS sp_findPostByCommentId;

DELIMITER $
CREATE PROCEDURE sp_findPostByCommentId(IN comment_id int, OUT result_id int)
BEGIN
	DECLARE parent_id int;
    SET max_sp_recursion_depth=50;
    
	IF comment_id NOT IN (SELECT id FROM comment WHERE post_id IS NOT NULL)
    THEN
		SELECT (SELECT parent_id FROM comment WHERE id=comment_id) INTO parent_id;
        CALL sp_findPostByCommentId(parent_id, result_id);
	ELSE
		SELECT (SELECT comment.post_id FROM comment WHERE id=comment_id) INTO post_id;
        SELECT post_id;
    END IF;
END $

