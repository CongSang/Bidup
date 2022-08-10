/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author ADMIN
 */
@Controller
public class SearchController {
    
    @GetMapping("/hashtag/{hashtag}")
    public String hastagPage(@PathVariable(value="hashtag") String hashtag) {
        
        return "hashtagPage";
    }
}
