/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.pojo.reobj.NotificationResponse;
import com.charitysm.services.NotificationService;
import com.charitysm.services.UserService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
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
 * @author ADMIN
 */
@RestController
@RequestMapping("/api")
public class APINotificationController {
    @Autowired
    private NotificationService notificationService;
    
    @Async
    @GetMapping("/get-notifs")
    public ResponseEntity<List<NotificationResponse>> getNotifs(@RequestParam Map<String, String> params 
            ,HttpSession session) {
        
        User u = (User) session.getAttribute("currentUser");
        List<NotificationResponse> res = notificationService.getNotifs(u.getId(), params);
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    
}
