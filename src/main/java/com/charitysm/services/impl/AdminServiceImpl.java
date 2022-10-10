/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.Config;
import com.charitysm.pojo.communicateObj.CountStats;
import com.charitysm.pojo.communicateObj.UserRequest;
import com.charitysm.repositories.AuctionRepository;
import com.charitysm.repositories.CommentRepository;
import com.charitysm.repositories.PostRepository;
import com.charitysm.repositories.ReactRepository;
import com.charitysm.repositories.ReportRepository;
import com.charitysm.repositories.UserRepository;
import com.charitysm.services.AdminService;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class AdminServiceImpl implements AdminService{
    
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private ReactRepository reactRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    public CountStats countStats(int year) {
        CountStats rs = new CountStats();
        rs.setCountUser(this.userRepository.countUserMonthly(year));
        rs.setCountPost(this.postRepository.countPostMonthly(year));
        rs.setCountAuction(this.auctionRepository.countAuctionMonthly(year));
        rs.setCountReportUser(this.reportRepository.countReportUserMonthly(year));
        rs.setCountReact(this.reactRepository.countReactMonthly(year));
        rs.setCountComment(this.commentRepository.countCommentMonthly(year));
        
        return rs;
    }
    
    @Override
    public long countAuctionStats(int month, int year) {
        return this.auctionRepository.countAuctionStats(month, year);
    }
    
    @Override
    public boolean acceptAuction(int auctionId, int hour) {
        return this.auctionRepository.acceptAuction(auctionId, hour);
    }

    @Override
    public List<Config> getConfig() {
        return this.auctionRepository.getConfig();
    }

    @Override
    public boolean updateConfig(Config c) {
        return this.auctionRepository.updateConfig(c);
    }
    
    @Override
    public long countCommentStats(int month, int year) {
        return this.commentRepository.countCommentStats(month, year);
    }

    @Override
    public long countPostStats(int month, int year) {
        return this.postRepository.countPostStats(month, year);
    }

    @Override
    public long countReactStats(int month, int year) {
        return this.reactRepository.countReactStats(month, year);
    }

    @Override
    public long countReportUserStats(int month, int year) {
        return this.reportRepository.countReportUserStats(month, year);
    }

    @Override
    public long countUserStats(int month, int year) {
        return this.userRepository.countUserStats(month, year);
    }

    @Override
    public boolean blockAccount(String userId) {
        return this.userRepository.blockAccount(userId);
    }

    @Override
    public List<User> getUsers(Map<String, String> params) {
        return this.userRepository.getUsers(params);
    }

    @Override
    public boolean enableAccount(String userId) {
        User u = this.userRepository.getUserById(userId);
        u.setActive((short)1);
        return this.userRepository.editUserInfo(u);
    }

    @Override
    public boolean deleteUser(String userId) {
        return this.userRepository.deleteUser(userId);
    }

    @Override
    public User addUser(UserRequest req) {
        try {
            User u = new User(req);
            String uniqueID = UUID.randomUUID().toString();
            u.setId(uniqueID);
            u.setPassword(this.passwordEncoder.encode(req.getPassword()));
            
            if(this.userRepository.registerNewUser(u))
                return u;
        } catch (ParseException ex) {
            Logger.getLogger(AdminServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
