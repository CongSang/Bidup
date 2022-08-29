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
import com.charitysm.services.UserService;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
public class ApiUserController {
    
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    
    
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
    public ResponseEntity<List<User>> getUsers(@RequestParam Map<String, String> params, HttpSession session) {
        User currentUser = (User)session.getAttribute("currentUser");
        return new ResponseEntity<>(this.userService.getUsers(params, currentUser.getId()), HttpStatus.OK);
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/follow-user/{userId}")
    public void followUser(@PathVariable(value="userId")String userId, HttpSession session){
        User currentUser = (User)session.getAttribute("currentUser");
        
        this.userService.followUser(currentUser.getId(), userId);
    }
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/unfollow-user/{userId}")
    public void unFollowUser(@PathVariable(value="userId")String userId, HttpSession session){
        User currentUser = (User)session.getAttribute("currentUser");
        
        this.userService.unFollowUser(currentUser.getId(), userId);
    }
}
