/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers.apis;

import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.Config;
import com.charitysm.services.AdminService;
import java.io.IOException;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/admin/api")
public class APIAdminController {
    @Autowired
    private AdminService adminService;
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/accept-auction/{auctionId}")
    public void AcceptAuction(@PathVariable(value = "auctionId") int id){
        this.adminService.acceptAuction(id);
    }
    
    @Async
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/update-config")
    public void updateConfig(@RequestBody Config c){

        this.adminService.updateConfig(c);
    }
    
    @Async
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/block-user/{userId}")
    public void blockUser(@PathVariable(value="userId") String userId,
            HttpSession session) throws IOException {
        User u = (User)session.getAttribute("currentUser");
        
        if (u.getUserRole().equals("ROLE_ADMIN")) {
            this.adminService.blockAccount(userId);
        }
    }
}
