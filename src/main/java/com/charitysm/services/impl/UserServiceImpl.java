/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.UserRequest;
import com.charitysm.repositories.UserRepository;
import com.charitysm.services.UserService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author ADMIN
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Cloudinary cloudinary;

    @Override
    @Transactional
    public boolean isEmailAlreadyInUse(String email) {
        boolean userInDb = true;
        if (userRepository.getActiveUser(email) == null) {
            userInDb = false;
        }
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
        users.forEach(u -> {
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

    @Override
    public boolean editUserInfo(UserRequest req, String userId) {
        User user = this.userRepository.getUserById(userId);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if(req.getFirstname() != null) user.setFirstname(req.getFirstname());
            if(req.getLastname() != null) user.setLastname(req.getLastname());
            if(req.getBirthdate() != null) {
                Date birth = format.parse(req.getBirthdate());
                user.setBirthdate(birth);
            }
            if(req.getAddress() != null) user.setAddress(req.getAddress());
            if(req.getHometown() != null) user.setHometown(req.getHometown());
            if(req.getJob() != null) user.setJob(req.getJob());
            if(req.getEmail() != null) user.setEmail(req.getEmail());
            if(req.getPhone() != null) user.setPhone(req.getPhone());

            if (req.getAvatar() != null) {
                cloudinary.uploader().destroy(user.getAvatar().substring(user.getAvatar().lastIndexOf("public_id=") + 10),
                        ObjectUtils.asMap("resource_type", "image"));

                user.setAvatar(req.getAvatar());
            }

            if (this.userRepository.editUserInfo(user) == true) {
                return true;
            }
        } catch (ParseException | IOException ex) {
            Logger.getLogger(UserServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        return false;
    }

    @Override
    public boolean checkFollowed(String followerId, String followedId) {
        return this.userRepository.checkFollowed(followerId, followedId);
    }

    @Override
    public boolean blockAccount(String userId) {
        return this.userRepository.blockAccount(userId);
    }
}
