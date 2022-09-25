/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.communicateObj.Config;
import com.charitysm.repositories.AuctionRepository;
import com.charitysm.repositories.CommentRepository;
import com.charitysm.repositories.PostRepository;
import com.charitysm.repositories.ReactRepository;
import com.charitysm.repositories.ReportRepository;
import com.charitysm.repositories.UserRepository;
import com.charitysm.services.AdminService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Override
    public long countAuctionStats(int month, int year) {
        return this.auctionRepository.countAuctionStats(month, year);
    }
    
    @Override
    public boolean acceptAuction(int auctionId) {
        return this.auctionRepository.acceptAuction(auctionId);
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
}
