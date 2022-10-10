DROP PROCEDURE IF EXISTS sp_countReportUserMonthly;

DELIMITER $
CREATE PROCEDURE sp_countReportUserMonthly(IN inputYear int)
BEGIN
SELECT(
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=1 AND YEAR(reported_date)=inputYear
    ) as janCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=2 AND YEAR(reported_date)=inputYear
    ) as febCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=3 AND YEAR(reported_date)=inputYear
    ) as marCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=4 AND YEAR(reported_date)=inputYear
    ) as aprCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=5 AND YEAR(reported_date)=inputYear
    ) as mayCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=6 AND YEAR(reported_date)=inputYear
    ) as junCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=7 AND YEAR(reported_date)=inputYear
    ) as julCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=8 AND YEAR(reported_date)=inputYear
    ) as augCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=9 AND YEAR(reported_date)=inputYear
    ) as sepCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=10 AND YEAR(reported_date)=inputYear
    ) as octCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=11 AND YEAR(reported_date)=inputYear
    ) as novCount, (
	SELECT COUNT(id)
    FROM report_user
    WHERE MONTH(reported_date)=12 AND YEAR(reported_date)=inputYear
    ) as decCount;
    
END
$