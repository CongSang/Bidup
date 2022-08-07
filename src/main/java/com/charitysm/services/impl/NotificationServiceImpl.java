/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.pojo.reobj.NotificationResponse;
import com.charitysm.repositories.NotificationRepository;
import com.charitysm.services.NotificationService;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class NotificationServiceImpl implements NotificationService{
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<NotificationResponse> getNotifs(String userId) {
        List<Object[]> data = this.notificationRepository.getNotifs(userId);
        List<NotificationResponse> rs = new ArrayList<>();
        data.forEach(d -> {
            NotificationResponse n = new NotificationResponse();
            n.setPostId((int)d[0]);
            n.setType(NotifType.valueOf((String) d[1]));
            if (d[2].toString().equals("0"))
                n.setIs_read(false);
            else
                n.setIs_read(true);
            n.setCount(Integer.parseInt(d[3].toString()));
            n.setLast_modified_name((String) d[4]);
            n.setLast_modified_avatar((String) d[5]);
            n.setLast_modified((Date) d[6]);
            rs.add(n);
        });
        return rs;
    }

    @Override
    public void updateNotif(int postId, NotifType type) {
        this.notificationRepository.updateNotif(postId, type);
    }
    
}
