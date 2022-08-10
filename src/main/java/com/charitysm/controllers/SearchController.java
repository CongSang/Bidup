/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.services.PostService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author ADMIN
 */
@Controller
public class SearchController {
    @Autowired
    private PostService postService;
    
    @GetMapping("/hashtag/{hashtag}")
    public String hastagPage(@PathVariable(value="hashtag") String hashtag, 
            Model model) {
        model.addAttribute("hashtag", hashtag);
        return "hashtagPage";
    }
    
    @GetMapping("/search")
    public String searchPage(@RequestParam Map<String,String> params, 
            Model model) {
        
        return "searchPage";
    }
}
