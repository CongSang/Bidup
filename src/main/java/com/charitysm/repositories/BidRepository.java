/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.Bid;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public interface BidRepository {

    Bid createBid(Bid b);

    boolean deleteBid(Bid b);

    Bid findBid(String userId, int auctionId);

    boolean updateBid(Bid b);

    List<Bid> getBids(int auctionId);
}
