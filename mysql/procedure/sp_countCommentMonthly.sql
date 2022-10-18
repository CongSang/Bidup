DROP PROCEDURE IF EXISTS sp_countCommentMonthly;

DELIMITER $
CREATE PROCEDURE sp_countCommentMonthly(IN inputYear int)
BEGIN
SELECT(
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=1 AND YEAR(comment_date)=inputYear
    ) as janCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=2 AND YEAR(comment_date)=inputYear
    ) as febCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=3 AND YEAR(comment_date)=inputYear
    ) as marCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=4 AND YEAR(comment_date)=inputYear
    ) as aprCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=5 AND YEAR(comment_date)=inputYear
    ) as mayCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=6 AND YEAR(comment_date)=inputYear
    ) as junCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=7 AND YEAR(comment_date)=inputYear
    ) as julCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=8 AND YEAR(comment_date)=inputYear
    ) as augCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=9 AND YEAR(comment_date)=inputYear
    ) as sepCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=10 AND YEAR(comment_date)=inputYear
    ) as octCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=11 AND YEAR(comment_date)=inputYear
    ) as novCount, (
	SELECT COUNT(id)
    FROM comment
    WHERE MONTH(comment_date)=12 AND YEAR(comment_date)=inputYear
    ) as decCount;
    
END
$