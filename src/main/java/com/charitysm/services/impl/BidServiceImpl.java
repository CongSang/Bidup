/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.controllers.NotificationCenter;
import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Bid;
import com.charitysm.pojo.BidPK;
import com.charitysm.pojo.User;
import com.charitysm.pojo.reobj.BidRequest;
import com.charitysm.repositories.BidRepository;
import com.charitysm.services.AuctionService;
import com.charitysm.services.BidService;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private AuctionService auctionService;

    @Override
    public Bid createBid(BidRequest bq, User u) {
        try {
            Bid bid = new Bid();
            bid.setBidDate(new Date());
            bid.setMessage("");
            bid.setMoney(bq.getMoney());
            bid.setIsWinner((short) 0);

            Auction a = auctionService.getAuctionById(bq.getAuctionId());

            BidPK bidPK = new BidPK();
            bidPK.setUserId(u.getId());
            bidPK.setAuctionId(bq.getAuctionId());

            bid.setBidPK(bidPK);
            bid.setUser(u);
            bid.setAuction(a);
            if (this.bidRepository.createBid(bid) != null) {
                NotificationCenter.sendMessage(a.getUserId().getId());
                return bid;
            }
        } catch (IOException | EntityNotFoundException ex) {
            ex.printStackTrace();
            return null;
        }
        return null;
    }

    @Override
    public void deleteBid(Bid b) {
        this.bidRepository.deleteBid(b);
    }

    @Override
    public Bid findBid(String userId, int auctionId) {
        return bidRepository.findBid(userId, auctionId);
    }

    @Override
    public void updateWinner(Bid b) {
        this.bidRepository.updateWinner(b);
    }

    @Override
    public List<Bid> getBids(int auctionId) {
        return this.bidRepository.getBids(auctionId);
    }

}
