DROP PROCEDURE IF EXISTS sp_countReactMonthly;

DELIMITER $
CREATE PROCEDURE sp_countReactMonthly(IN inputYear int)
BEGIN
SELECT(
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=1 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=1 AND YEAR(created_date)=inputYear
			)
		) 
    ) as janCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=2 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=2 AND YEAR(created_date)=inputYear
			)
		) 
    ) as febCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=3 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=3 AND YEAR(created_date)=inputYear
			)
		) 
    ) as marCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=4 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=4 AND YEAR(created_date)=inputYear
			)
		) 
    ) as aprCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=5 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=5 AND YEAR(created_date)=inputYear
			)
		) 
    ) as mayCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=6 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=6 AND YEAR(created_date)=inputYear
			)
		) 
    ) as junCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=7 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=7 AND YEAR(created_date)=inputYear
			)
		) 
    ) as julCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=8 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=8 AND YEAR(created_date)=inputYear
			)
		) 
    ) as augCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=9 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=9 AND YEAR(created_date)=inputYear
			)
		) 
    ) as sepCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=10 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=10 AND YEAR(created_date)=inputYear
			)
		) 
    ) as octCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=11 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=11 AND YEAR(created_date)=inputYear
			)
		) 
    ) as novCount, (
		SELECT ((
			SELECT COUNT(post_id)
			FROM react
			WHERE MONTH(created_date)=12 AND YEAR(created_date)=inputYear
			) + (
			SELECT COUNT(comment_id)
			FROM react_comment
			WHERE MONTH(created_date)=12 AND YEAR(created_date)=inputYear
			)
		) 
    ) as decCount;
    
END
$