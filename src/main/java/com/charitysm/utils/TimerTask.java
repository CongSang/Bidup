/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import com.charitysm.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author ADMIN
 */
@Component
public class TimerTask {
    @Autowired
    private AuctionService auctionService;
    
    @Scheduled(fixedDelay = 5000, initialDelay = 0)
    public void scheduleUpdateAuctionTask() {
//        List<Auction> list = this.auctionService.getAuctions(null);
//        list.forEach(a -> {
//            if (a.getEndDate() != null && a.getEndDate().after(new Date())) {
//                a
//            }
//        });
    }
}
