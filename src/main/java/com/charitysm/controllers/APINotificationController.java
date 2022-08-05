/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.pojo.reobj.NotificationResponse;
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
    private UserService userService;
    
    @Async
    @GetMapping("/notifs")
    public ResponseEntity<NotificationResponse> getNotifs() {
        
        User u = userService.getUserById("abcd");
        NotificationResponse res = new NotificationResponse();
        List<Map<String, Object>> notifs = new ArrayList<>();
        Map<String, Object> notif = new HashMap<>();
        Map<String, String> userInfo = new HashMap<>();
        
        userInfo.put("firstName", u.getFirstname());
        userInfo.put("avatar", u.getAvatar());
        
        notif.put("postId", "1");
        notif.put("count", "20");
        notif.put("mostRecent", "2022-07-26 07:00:00");
        notif.put("mostRecentUser", userInfo);
        notif.put("type", "react");
        notifs.add(notif);
        res.setData(notifs);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
