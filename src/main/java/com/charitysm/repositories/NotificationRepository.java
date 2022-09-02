/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.enumtype.NotifType;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface NotificationRepository {

    List<Object[]> getNotifs(String userId, Map<String, String> params);

    void updateNotif(int targetId, NotifType type);

    void updateAuctionNotif(int postId, NotifType type);

    void readNotif(int notifId, NotifType type);
}
