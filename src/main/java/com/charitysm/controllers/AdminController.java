/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.services.AdminService;
import com.charitysm.services.AuctionService;
import com.charitysm.services.CommentService;
import com.charitysm.services.PostService;
import com.charitysm.services.ReactService;
import com.charitysm.services.ReportService;
import com.charitysm.services.UserService;
import java.time.Year;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class AdminController {
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private AdminService adminService;

    @GetMapping("/admin")
    public String admin(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", defaultValue = "2022") int year) {

        model.addAttribute("postCount", this.adminService.countPostStats(month, year));
        model.addAttribute("userCount", this.adminService.countUserStats(month, year));
        model.addAttribute("auctionCount", this.adminService.countAuctionStats(month, year));
        model.addAttribute("reactCount", this.adminService.countReactStats(month, year));
        model.addAttribute("commentCount", this.adminService.countCommentStats(month, year));
        model.addAttribute("reportUserCount", this.adminService.countReportUserStats(month, year));

        model.addAttribute("currentYear", Year.now().getValue());
        model.addAttribute("year", year);
        model.addAttribute("month", month);
        return "adminChart";
    }

    @GetMapping("/admin/report-post")
    public String adminReportPost(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", defaultValue = "2022") int year) {

        model.addAttribute("report", this.reportService.getReportPost(month, year));
        model.addAttribute("reportType", "Báo cáo bài viết");
        model.addAttribute("currentYear", Year.now().getValue());

        return "adminReport";
    }

    @GetMapping("/admin/report-auction")
    public String adminReportAuction(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", defaultValue = "2022") int year) {

        model.addAttribute("report", this.reportService.getReportAuction(month, year));
        model.addAttribute("reportType", "Báo cáo bài đấu giá");
        model.addAttribute("currentYear", Year.now().getValue());

        return "adminReport";
    }

    @GetMapping("/admin/report-user")
    public String adminReportUser(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", defaultValue = "2022") int year) {

        model.addAttribute("report", this.reportService.getReportUser(month, year));
        model.addAttribute("reportType", "Báo cáo người dùng");
        model.addAttribute("currentYear", Year.now().getValue());

        return "adminReport";
    }
    
    @GetMapping("/admin/auction-check")
    public String acceptAuction(Model model) {
        model.addAttribute("auctions", this.auctionService.getAuctionsNoActive());
        
        return "adminAcceptAuction";
    }
    
    @GetMapping("/admin/configurations")
    public String configurations(Model model) {
        System.out.println("aa" + this.adminService.getConfig());
        model.addAttribute("configs", this.adminService.getConfig());
        
        return "configurations";
    }
}
