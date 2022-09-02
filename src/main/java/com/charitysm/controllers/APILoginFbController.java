/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.services.UserService;
import com.charitysm.utils.RestFB;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;
import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
public class APILoginFbController {
    @Autowired
    private RestFB restFB;
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @RequestMapping("/login-facebook")
    public void loginFacebook(HttpServletRequest request
            , HttpSession session, HttpServletResponse response) throws IOException {
        String code = request.getParameter("code");
        if (code == null || code.isEmpty()) { 
            response.sendRedirect("login");
        }
        else {
            String accessToken = restFB.getToken(code);
            
            FacebookClient client = new DefaultFacebookClient(accessToken, restFB.getAppSecret(), Version.LATEST);
            User fbUser = client.fetchObject("me", User.class, Parameter.with("fields"
                    , "id,first_name,last_name,email,picture,birthday,location,hometown"));
            
            //create new user based on fb user here
            com.charitysm.pojo.User user = new com.charitysm.pojo.User();
            user.setEmail(fbUser.getEmail());
            
            session.setAttribute("loginType", "loginFB");
            try {
                com.charitysm.pojo.User currentUser = this.userService.getUser(user.getEmail());
                if ( currentUser != null) {
                    String pass = new StringBuilder(currentUser.getId()).reverse().toString().substring(25);
                    session.setAttribute("email", user.getEmail());
                    session.setAttribute("pass", pass);
                    response.sendRedirect("login");
                }
            } catch(NoResultException e){
                String uniqueID = UUID.randomUUID().toString();
                String pass = new StringBuilder(uniqueID).reverse().toString().substring(25);
                user.setId(uniqueID);
                user.setAvatar(fbUser.getPicture().getUrl());
                user.setFirstname(fbUser.getFirstName());
                user.setLastname(fbUser.getLastName());
                user.setActive((short)1);
                user.setCreatedDate(new Date());
                user.setPassword(this.passwordEncoder.encode(pass));
                user.setUserRole("ROLE_USER");
                user.setBirthdate(fbUser.getBirthdayAsDate());
                user.setAddress(fbUser.getLocale());
                user.setHometown(fbUser.getHometownName());
                user.setJob(null);
                user.setPhone(null);
                
                if (this.userService.registerNewUser(user) == true) {
                //done then set current user with created user and redirect
                
                    session.setAttribute("email", user.getEmail());
                    session.setAttribute("pass", pass);
                    
                    
                    response.sendRedirect("login");
                }
                else
                    response.sendRedirect("login");  
            }
        }
    }
}
