/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.services.AuctionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class ApiAuctionController {
    
    @Autowired
    private AuctionService auctionService;
    
    @Async
    @GetMapping("/auction-side")
    public ResponseEntity<List<Auction>> getActionSideBar() {
        
        return new ResponseEntity<>(this.auctionService.getAuctionSideBar(), HttpStatus.OK);
    }
    
    @Async
    @GetMapping("/auctions")
    public ResponseEntity<List<Auction>> getPosts(@RequestParam("page") int page) {
   
        return new ResponseEntity<>(this.auctionService.getAuctions(null, page), HttpStatus.OK);
    }
}
