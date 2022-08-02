/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Bid;
import com.charitysm.pojo.BidPK;
import com.charitysm.pojo.reobj.BidRequest;
import com.charitysm.pojo.User;
import com.charitysm.services.AuctionService;
import com.charitysm.services.BidService;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    @Autowired
    private BidService bidService;
    
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
    
    @Async
    @DeleteMapping("/auctions/{auctionId}")
     @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuction(@PathVariable(value = "auctionId") int id) {
        this.auctionService.deleteAuction(id);
    }
    
    @Async
    @PostMapping("/create-bid")
    public ResponseEntity<Bid> createBid(@RequestBody BidRequest b, HttpSession session) {
        Bid bid = new Bid();
        bid.setBidDate(new Date());
        bid.setMessage("");
        bid.setMoney(b.getMoney());
        
         User u = (User)session.getAttribute("currentUser");
         Auction a = auctionService.getAuctionById(b.getAuctionId());
         
         BidPK bidPK = new BidPK();
         bidPK.setUserId(u.getId());
         bidPK.setAuctionId(b.getAuctionId());
         
         bid.setBidPK(bidPK);
         bid.setUser(u);
         bid.setAuction(a);
        return new ResponseEntity<>(this.bidService.createBid(bid), HttpStatus.CREATED);
    }
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-bid")
    public void deleteReact(@RequestBody BidRequest b, HttpSession session) {
        User u = (User)session.getAttribute("currentUser");
        Bid bid = bidService.findBid(u.getId(), b.getAuctionId());
        if (bid != null)
            bidService.deleteBid(bid);
    }
}
