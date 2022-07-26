/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author ADMIN
 */
@Controller
public class SearchController {
    
    @GetMapping("/hashtag/{hashtag}")
    public String hastagPage(@PathVariable(value="hashtag") String hashtag, 
            Model model) {
        model.addAttribute("hashtag", hashtag);
        return "hashtagPage";
    }
    
    @GetMapping("/search/top")
    public String searchPage() {
        return "searchPage";
    }
    
    @GetMapping("/search/posts")
    public String searchPostPage() {
        return "searchPage";
    }
    
    @GetMapping("/search/people")
    public String searchPeoplePage() {
        return "searchPage";
    }
    
    @GetMapping("/search/auctions")
    public String searchAuctionPage() {
        return "searchPage";
    }
}
