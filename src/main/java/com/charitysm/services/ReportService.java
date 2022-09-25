/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import java.util.List;

/**
 *
 * @author CÔNG SANG
 */
public interface ReportService {

    void createPostReport(ReportPost report);

    void createAuctionReport(ReportAuction report);

    void createUserReport(ReportUser report);

    List<ReportPost> getReportPost(int month, int year);

    List<ReportAuction> getReportAuction(int month, int year);

    List<ReportUser> getReportUser(int month, int year);
    
    boolean deleteReportUser(int reportId);
}
