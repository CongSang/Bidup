/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.Bid;
import com.charitysm.repositories.BidRepository;
import com.charitysm.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class BidServiceImpl implements BidService{
    
    @Autowired
    private BidRepository bidRepository;

    @Override
    public Bid createBid(Bid b) {
        return this.bidRepository.createBid(b);
    }

    @Override
    public void deleteBid(Bid b) {
        this.bidRepository.deleteBid(b);
    }

    @Override
    public Bid findBid(String userId, int auctionId) {
        return bidRepository.findBid(userId, auctionId);
    }
    
}
