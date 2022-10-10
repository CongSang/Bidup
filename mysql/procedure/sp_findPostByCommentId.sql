DROP PROCEDURE IF EXISTS sp_findPostByCommentId;

DELIMITER $
CREATE PROCEDURE sp_findPostByCommentId(IN comment_id int)
BEGIN
	DECLARE p_id int;
    DECLARE result_id int;
    SET max_sp_recursion_depth=50;
    
	IF comment_id NOT IN (SELECT id FROM comment WHERE post_id IS NOT NULL)
    THEN
		SELECT (SELECT parent_id FROM comment WHERE id=comment_id) INTO p_id;
        CALL sp_findPostByCommentId(p_id);
	ELSE
		SELECT (SELECT comment.post_id FROM comment WHERE id=comment_id) INTO result_id;
        SELECT * FROM post WHERE id=result_id;
    END IF;
END $

