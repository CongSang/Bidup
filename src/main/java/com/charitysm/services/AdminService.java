/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.Config;
import com.charitysm.pojo.communicateObj.UserRequest;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface AdminService {
    List<Config> getConfig();
    
    boolean acceptAuction(int auctionId, int hour);

    long countAuctionStats(int month, int year);
    
    boolean updateConfig(Config c);

    long countCommentStats(int month, int year);

    long countPostStats(int month, int year);

    long countReactStats(int month, int year);

    long countReportUserStats(int month, int year);

    long countUserStats(int month, int year);
    
    boolean blockAccount(String userId);
    
    boolean enableAccount(String userId);
    
    List<User> getUsers(Map<String, String> params);
    
    public boolean deleteUser(String userId);
    
    public User addUser(UserRequest req);
}
