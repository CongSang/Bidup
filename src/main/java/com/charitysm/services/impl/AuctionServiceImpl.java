/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.Auction;
import com.charitysm.repositories.AuctionRepository;
import com.charitysm.services.AuctionService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class AuctionServiceImpl implements AuctionService{
    
    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    public List<Auction> getAuctionSideBar() {
        return this.auctionRepository.getAuctionSideBar();
    }

    @Override
    public List<Auction> getAuctions(Map<String, String> params) {
        return this.auctionRepository.getAuctions(params);
    }

    @Override
    public Auction getAuctionById(int id) {
        return this.auctionRepository.getAuctionById(id);
    }

    @Override
    public void deleteAuction(int id) {
        this.auctionRepository.deleteAuction(id);
    }

    @Override
    public int createAuction(Auction a) {
        return this.auctionRepository.createAuction(a);
    }

    @Override
    public int updateAuction(Auction a) {
        return this.auctionRepository.updateAuction(a);
    }

    @Override
    public int confirmCompleteCharity(Auction a) {
        return this.auctionRepository.confirmCompleteCharity(a);
    }

    @Override
    public void sendEmailAuction(Auction a) {
        this.auctionRepository.sendEmailAuction(a);
    }

    @Override
    public List<Auction> getUserAuction(String userId, int page) {
        return this.auctionRepository.getUserAuction(userId, page);
    }

    @Override
    public long countAuctionStats(int month, int year) {
        return this.auctionRepository.countAuctionStats(month, year);
    }
    
}
