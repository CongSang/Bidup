/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.Bid;

/**
 *
 * @author ADMIN
 */
public interface BidRepository {
    Bid createBid(Bid b);
    void deleteBid(Bid b);
    Bid findBid(String userId, int auctionId);
    void updateWinner(Bid b);
}
