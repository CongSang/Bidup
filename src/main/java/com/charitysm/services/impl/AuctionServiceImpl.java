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
    public List<Auction> getAuctions(Map<String, String> params, int page) {
        return this.auctionRepository.getAuctions(params, page);
    }

    @Override
    public Auction getAuctionById(int id) {
        return this.auctionRepository.getAuctionById(id);
    }
    
}
