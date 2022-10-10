/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.communicateObj.CountStats;
import com.charitysm.services.AdminService;
import com.charitysm.services.AuctionService;
import com.charitysm.services.ReportService;
import com.charitysm.utils.ListUtils;
import java.time.Year;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
    @Autowired
    private Environment env;

    @GetMapping("/admin")
    public String admin(Model model,
            @RequestParam(value = "month", required = false, defaultValue = "0") int month,
            @RequestParam(value = "year", required = false, defaultValue = "0") int year) {
        
        year = year == 0 ? Year.now().getValue() : year;
        
        CountStats c = this.adminService.countStats(year);
        
        model.addAttribute("postCount", ListUtils.sumLong(c.getCountPost()));
        model.addAttribute("userCount", ListUtils.sumLong(c.getCountUser()));
        model.addAttribute("auctionCount", ListUtils.sumLong(c.getCountAuction()));
        model.addAttribute("reactCount", ListUtils.sumLong(c.getCountReact()));
        model.addAttribute("commentCount", ListUtils.sumLong(c.getCountComment()));
        model.addAttribute("reportUserCount", ListUtils.sumLong(c.getCountReportUser()));

        model.addAttribute("currentYear", Year.now().getValue());
        model.addAttribute("year", year);
        model.addAttribute("month", month);
        
        
        model.addAttribute("countStats", c);
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
        model.addAttribute("configs", this.adminService.getConfig());
        
        return "configurations";
    }
    
    @GetMapping("/admin/user-list")
    public String userList(Model model,
            @RequestParam Map<String, String> params) {
        if (params.get("limit") == null)
            params.put("limit", "10");
        if (params.get("page") == null)
            params.put("page", "1");
            
        model.addAttribute("users", this.adminService.getUsers(params));
        model.addAttribute("count", this.adminService.countUserStats(0, 0));
        model.addAttribute("size", env.getProperty("user.list.size"));
        return "adminUsers";
    }
}
