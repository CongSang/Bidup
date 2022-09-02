/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

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
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private ReactService reactService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private ReportService reportService;

    @GetMapping("/admin")
    public String admin(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", defaultValue = "2022") int year) {

        model.addAttribute("postCount", this.postService.countPostStats(month, year));
        model.addAttribute("userCount", this.userService.countUserStats(month, year));
        model.addAttribute("auctionCount", this.auctionService.countAuctionStats(month, year));
        model.addAttribute("reactCount", this.reactService.countReactStats(month, year));
        model.addAttribute("commentCount", this.commentService.countCommentStats(month, year));
        model.addAttribute("reportUserCount", this.reportService.countReportUserStats(month, year));

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
}
