/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author ADMIN
 */
public class NotificationCenter {
    @Autowired
    private NotificationService notificationService;
    
    public void updateNotif(int postId, NotifType type) {
        this.notificationService.updateNotif(postId, type);
    }
    
    //thong bao realtime
    public void notifUser() {
        
    }

    public NotificationCenter() {
    }
}
