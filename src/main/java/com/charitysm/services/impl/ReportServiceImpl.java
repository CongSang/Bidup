/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import com.charitysm.repositories.ReportRepository;
import com.charitysm.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CÔNG SANG
 */
@Service
public class ReportServiceImpl implements ReportService {
    
    @Autowired
    private ReportRepository reportRepository;

    @Override
    public void createPostReport(ReportPost report) {
        this.reportRepository.createPostReport(report);
    }

    @Override
    public void createAuctionReport(ReportAuction report) {
        this.reportRepository.createAuctionReport(report);
    }

    @Override
    public void createUserReport(ReportUser report) {
        this.reportRepository.createUserReport(report);
    }
    
}
