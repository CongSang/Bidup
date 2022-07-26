/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.User;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface UserRepository {

    User getUser(String email);

    User getUserById(String id);

    boolean registerNewUser(User user);

    List<User> getUsers(Map<String, String> params);

    long countUserStats(int month, int year);

    User getActiveUser(String email);

    boolean followUser(String followerId, String followedId);

    boolean unFollowUser(String followerId, String followedId);

    boolean checkFollowed(String followerId, String followedId);

    boolean editUserInfo(User u);
    
    boolean blockAccount(String userId);
    
    public boolean deleteUser(String userId);
    
    List<Long> countUserMonthly(int year);
}
