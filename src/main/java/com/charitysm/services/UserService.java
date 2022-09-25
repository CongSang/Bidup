/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.UserRequest;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 *
 * @author ADMIN
 */
public interface UserService extends UserDetailsService {

    User getUser(String email);

    User getUserById(String id);

    boolean registerNewUser(User user);

    List<User> getUsers(Map<String, String> params, String currentUserId);

    boolean isEmailAlreadyInUse(String email);

    boolean followUser(String followerId, String followedId);

    boolean unFollowUser(String followerId, String followedId);

    boolean checkFollowed(String followerId, String followedId);

    boolean editUserInfo(UserRequest req, String userId);
}
