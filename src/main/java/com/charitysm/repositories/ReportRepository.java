/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import java.util.List;

/**
 *
 * @author CÔNG SANG
 */
public interface ReportRepository {

    void createPostReport(ReportPost report);

    void createAuctionReport(ReportAuction report);

    void createUserReport(ReportUser report);

    long countReportUserStats(int month, int year);

    List<ReportPost> getReportPost(int month, int year);

    List<ReportAuction> getReportAuction(int month, int year);

    List<ReportUser> getReportUser(int month, int year);
    
    boolean deleteReportUser(int reportId);
    
    List<Long> countReportUserMonthly(int year);
}
