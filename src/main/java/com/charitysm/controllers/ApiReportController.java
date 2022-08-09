/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import com.charitysm.pojo.User;
import com.charitysm.pojo.reobj.ReportRequest;
import com.charitysm.services.AuctionService;
import com.charitysm.services.PostService;
import com.charitysm.services.ReportService;
import com.charitysm.services.UserService;
import java.util.Date;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class ApiReportController {
    
    @Autowired
    private ReportService reportService;
    @Autowired
    private PostService postService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private UserService userService;
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/report-post")
    public void createReportPost(@RequestBody ReportRequest rr, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");
        Post post = this.postService.getPostById(rr.getArticleId());
        
        if (post != null) {
            ReportPost p = new ReportPost();
            p.setIsSolve((short)0);
            p.setReportedDate(new Date());
            p.setUserId(u);
            p.setPostId(post);
            p.setReason(rr.getReason());
            
            this.reportService.createPostReport(p);
        }
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/report-auction")
    public void createReportAuction(@RequestBody ReportRequest rr, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");
        Auction auction = this.auctionService.getAuctionById(rr.getArticleId());
        
        if (auction != null) {
            ReportAuction p = new ReportAuction();
            p.setIsSolve((short)0);
            p.setReportedDate(new Date());
            p.setUserId(u);
            p.setAuctionId(auction);
            p.setReason(rr.getReason());
            
            this.reportService.createAuctionReport(p);
        }
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/report-user")
    public void createReportUser(@RequestBody ReportRequest rr, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");
        User reportedUser = this.userService.getUserById(rr.getUserId());
        
        if (reportedUser != null) {
            ReportUser p = new ReportUser();
            p.setIsSolve((short)0);
            p.setReportedDate(new Date());
            p.setUserId(u);
            p.setReportedUser(reportedUser);
            p.setReason(rr.getReason());
            
            this.reportService.createUserReport(p);
        }
    }
}
