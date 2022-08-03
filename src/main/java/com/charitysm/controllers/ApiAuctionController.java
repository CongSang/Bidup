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
import com.charitysm.pojo.reobj.AuctionRequest;
import com.charitysm.services.AuctionService;
import com.charitysm.services.BidService;
import com.charitysm.utils.CloudinaryUtils;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpSession;
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
    @RequestMapping("/create-auction")
    public ResponseEntity<Auction> createAuction(@RequestBody AuctionRequest ar, HttpSession session) throws ParseException {
        User u = (User)session.getAttribute("currentUser");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date endDate = format.parse(ar.getEndDate() + " " + ar.getEndTime());
        
        Auction a = new Auction();
        a.setActive((short)1);
        a.setContent(ar.getContent());
        a.setStartingPrice(ar.getStartPrice());
        a.setHashtag(ar.getHashtag());
        a.setAuctionDate(new Date());
        a.setEndDate(endDate);
        a.setImage(ar.getImgUrl());
        a.setUserId(u);
        
        if(this.auctionService.createAuction(a) < 1)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        
        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }
    
    @Async
    @DeleteMapping("/auctions/{auctionId}")
     @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuction(@PathVariable(value = "auctionId") int id) throws IOException {
        Auction a = this.auctionService.getAuctionById(id);
         if (a != null) {
            this.auctionService.deleteAuction(id);
            if (!a.getImage().isEmpty()) {
                String public_id = a.getImage().substring(a.getImage().lastIndexOf("public_id=") + 10);
                System.out.println(public_id);
                deleteImg(public_id);
            }
        }
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
    
    public void deleteImg(String public_id) throws IOException {
        CloudinaryUtils.getCloudinary().uploader().destroy(public_id,
                ObjectUtils.asMap("resource_type", "image"));
    }
}
