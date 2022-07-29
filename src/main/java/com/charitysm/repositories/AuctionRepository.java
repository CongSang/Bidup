/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.Auction;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface AuctionRepository {
    List<Auction> getAuctionSideBar();
    List<Auction> getAuctions(Map<String, String> params, int page);
}
