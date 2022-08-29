/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.User;
import com.charitysm.repositories.UserRepository;
import com.charitysm.services.UserService;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author ADMIN
 */
@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Override
    @Transactional
    public boolean isEmailAlreadyInUse(String email) {
        boolean userInDb = true;
        if (userRepository.getActiveUser(email) == null) userInDb = false;
        return userInDb;
    }

    @Override
    @Transactional(readOnly = true)
    public User getUser(String email) {
        return this.userRepository.getUser(email);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.userRepository.getUser(email);
        if (user == null) {
            throw new UsernameNotFoundException("Người dùng không tồn tại");
        }

        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(user.getUserRole())));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public User getUserById(String id) {
        return this.userRepository.getUserById(id);
    }

    @Override
    public boolean registerNewUser(User user) {
        return this.userRepository.registerNewUser(user);
    }
        
    @Override
    public List<User> getUsers(Map<String, String> params, String currentUserId) {
        List<User> users = this.userRepository.getUsers(params);
        users.forEach(u ->{
            u.setIsFollowed(this.userRepository.checkFollowed(currentUserId, u.getId()));
        }); 
        
        return users;
    }

    @Override
    public long countUserStats(int month, int year) {
        return this.userRepository.countUserStats(month, year);
    }

    @Override
    public boolean followUser(String followerId, String followedId) {
        return this.userRepository.followUser(followerId, followedId);
    }

    @Override
    public boolean unFollowUser(String followerId, String followedId) {
        return this.userRepository.unFollowUser(followerId, followedId);
    }
}
