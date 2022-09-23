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
import com.charitysm.pojo.communicateObj.BidRequest;
import com.charitysm.pojo.communicateObj.NotifMessage;
import com.charitysm.repositories.BidRepository;
import com.charitysm.services.AuctionService;
import com.charitysm.services.BidService;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityNotFoundException;
import javax.websocket.EncodeException;
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
    public Bid createBid(BidRequest bq, User u){
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
                a.getBidSet().remove(bid);
                a.getBidSet().forEach(b -> {
                    try {
                        //update notif of auction competitor
                        NotificationCenter.sendMessage(b.getUser().getId(), new NotifMessage(111, null));
                    } catch (IOException | EncodeException ex) {
                        Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                    }
                });
                //broadcast to notif users update UI
                NotificationCenter.broadcast(new NotifMessage(112, bid));
                //update notif of auction owner
                NotificationCenter.sendMessage(a.getUserId().getId(), new NotifMessage(111, null));
                return bid;
            }
        } catch (IOException | EntityNotFoundException | EncodeException ex) {
            Logger.getLogger(BidServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        return null;
    }

    @Override
    public void deleteBid(Bid b) {
        if (this.bidRepository.deleteBid(b)) {
            Auction a = b.getAuction();
            
            a.getBidSet().forEach(bid -> {
                try {
                    NotificationCenter.sendMessage(bid.getUser().getId(), new NotifMessage(111, null));
                } catch (IOException | EncodeException ex) {
                    Logger.getLogger(BidServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                }
            });
            try {
                NotificationCenter.broadcast(new NotifMessage(114, b));
                NotificationCenter.sendMessage(a.getUserId().getId(), new NotifMessage(111, null));
            } catch (IOException | EncodeException ex) {
                Logger.getLogger(BidServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public Bid findBid(String userId, int auctionId) {
        return bidRepository.findBid(userId, auctionId);
    }

    @Override
    public void updateBid(BidRequest br) {
        Bid b = this.bidRepository.findBid(br.getUserId(), br.getAuctionId());
        b.setMoney(br.getMoney());
        b.setBidDate(new Date());
        if (this.bidRepository.updateBid(b)) {
            Auction a = b.getAuction();
            a.getBidSet().forEach(bid -> {
                try {
                    NotificationCenter.sendMessage(bid.getUser().getId(), new NotifMessage(111, null));
                } catch (IOException | EncodeException ex) {
                    Logger.getLogger(BidServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
                }
            });
            try {
                NotificationCenter.broadcast(new NotifMessage(113, b));
                NotificationCenter.sendMessage(a.getUserId().getId(), new NotifMessage(111, null));
            } catch (IOException | EncodeException ex) {
                Logger.getLogger(BidServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public List<Bid> getBids(int auctionId) {
        return this.bidRepository.getBids(auctionId);
    }

}
