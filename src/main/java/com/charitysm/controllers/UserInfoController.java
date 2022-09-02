/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.User;
import com.charitysm.services.UserService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class UserInfoController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/{userId}")
    public String userinfo(Model model, @PathVariable(value = "userId") String id, HttpSession session) {
        User currentUser = (User)session.getAttribute("currentUser");
        model.addAttribute("userInfo", this.userService.getUserById(id));
        model.addAttribute("isFollowed", this.userService.checkFollowed(currentUser.getId(), id));
        return "userinfo";
    }
}
