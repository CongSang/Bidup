/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.pojo.reobj.NotificationResponse;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface NotificationService {
    List<NotificationResponse> getNotifs(String userId);
    void updateNotif(int postId, NotifType type);
}
