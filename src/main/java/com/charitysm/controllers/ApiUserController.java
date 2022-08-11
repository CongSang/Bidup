/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.services.AuctionService;
import com.charitysm.services.PostService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class ApiUserController {
    
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private PostService postService;
    
    @Async
    @GetMapping("/user/{userId}/auctions")
    public ResponseEntity<List<Auction>> getUserAuctions(@PathVariable(value = "userId") String userId, int page) {

        return new ResponseEntity<>(this.auctionService.getUserAuction(userId, page), HttpStatus.OK);
    }
    
    @Async
    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable(value = "userId") String userId, int page) {

        return new ResponseEntity<>(this.postService.getUserPosts(userId, page), HttpStatus.OK);
    }
    
    @Async
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestParam Map<String, String> params) {
        
        return null;
    }
}
