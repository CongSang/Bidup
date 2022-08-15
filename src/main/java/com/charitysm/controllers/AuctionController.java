/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.services.AuctionService;
import com.charitysm.services.NotificationService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class AuctionController {
    
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private NotificationService notificationService;
    
    @GetMapping("/auction")
    public String auction(Model model) {
        return "auction";
    }
    
    @GetMapping("/auctions/{auctionId}")
    public String getPost(@RequestParam Map<String, String> params,
            @PathVariable(value="auctionId") int auctionId, Model model) {
        if(params != null && !params.isEmpty()) {
            if (params.get("ref").equals("notif")) {
            String t = params.get("notif_type");
            String nId = params.get("notif_id");
            if (t != null && nId != null) {
                NotifType type = NotifType.valueOf(t);
                int notifId = Integer.parseInt(nId);
                this.notificationService.readNotif(notifId, type);
            }
        }
        }
        Auction a = this.auctionService.getAuctionById(auctionId);
        model.addAttribute("auction", a);
        return "auctionSingle";
    }
}
