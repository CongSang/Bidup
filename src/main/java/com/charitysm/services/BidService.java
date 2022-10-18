/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.Bid;
import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.BidRequest;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public interface BidService {

    Bid createBid(BidRequest bq, User u);

    void deleteBid(Bid b);

    Bid findBid(String userId, int auctionId);

    void updateBid(BidRequest br);

    List<Bid> getBids(int auctionId);
    
    long getTopPrice(int auctionId);
}
