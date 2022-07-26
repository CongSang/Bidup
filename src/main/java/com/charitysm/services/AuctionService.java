/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.Auction;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface AuctionService {

    List<Auction> getAuctionSideBar();

    List<Auction> getAuctions(Map<String, String> params);

    Auction getAuctionById(int id);

    int createAuction(Auction a);

    void deleteAuction(int id);

    int updateAuction(Auction a);

    int confirmCompleteCharity(Auction a);

    void sendEmailAuction(Auction a);

    List<Auction> getUserAuction(String userId, int page);
    
    List<Auction> getAuctionsNoActive();
    
    long getMinimum();
}
