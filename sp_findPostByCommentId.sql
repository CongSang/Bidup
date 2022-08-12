DROP PROCEDURE IF EXISTS sp_findPostByCommentId;

DELIMITER $
CREATE PROCEDURE sp_findPostByCommentId(IN comment_id int)
BEGIN
	DECLARE parent_id int;
    DECLARE post_id int;
    SET max_sp_recursion_depth=50;
    
	IF comment_id != (SELECT id FROM comment WHERE id=comment_id AND post_id IS NOT NULL)
    THEN
		SET parent_id = (SELECT parent_id FROM comment WHERE id=comment_id);
        CALL sp_findPostByCommentId(parent_id, post_id);
	ELSE
		SET post_id = (SELECT comment.post_id FROM comment WHERE id=comment_id);
        SELECT * FROM post WHERE id=post_id;
    END IF;
END $

