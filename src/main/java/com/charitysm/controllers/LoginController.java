package com.charitysm.controllers;

import com.charitysm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class LoginController {
    @Autowired 
    private UserService userService;

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }
}
