/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.pojo.communicateObj.NotificationResponse;
import com.charitysm.repositories.NotificationRepository;
import com.charitysm.services.NotificationService;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<NotificationResponse> getNotifs(String userId, Map<String, String> params) {
        List<Object[]> data = this.notificationRepository.getNotifs(userId, params);
        List<NotificationResponse> rs = new ArrayList<>();
        data.forEach(d -> {
            NotificationResponse n = new NotificationResponse();
            n.setTargetId((int) d[0]);
            n.setType(NotifType.valueOf((String) d[1]));
            if (d[2].toString().equals("0")) {
                n.setIs_read(false);
            } else {
                n.setIs_read(true);
            }
            n.setCount(Integer.parseInt(d[3].toString()));
            n.setLast_modified_name((String) d[4]);
            n.setLast_modified_avatar((String) d[5]);
            n.setLast_modified((Date) d[6]);
            n.setNotifId(Integer.parseInt(d[7].toString()));
            rs.add(n);
        });
        return rs;
    }

    @Override
    public void updateNotif(int targetId, NotifType type) {
        this.notificationRepository.updateNotif(targetId, type);
    }

    @Override
    public void readNotif(int notifId, NotifType type) {
        this.notificationRepository.readNotif(notifId, type);
    }

    @Override
    public void updateAuctionNotif(int postId, NotifType type) {
        this.notificationRepository.updateAuctionNotif(postId, type);
    }

}
