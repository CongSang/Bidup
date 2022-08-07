/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.utils.RestFB;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
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
            User user = client.fetchObject("me", User.class, Parameter.with("fields", "id,name,email,picture"));
            //create new user based on fb user here
            
            
            //done then set current user with created user and redirect
            session.setAttribute("current_user", user);
            response.sendRedirect("/SharingHope");
        }
    }
}
