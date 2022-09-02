package com.charitysm.controllers;

import com.charitysm.pojo.User;
import com.charitysm.services.UserService;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class IndexController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public String index() {
       
        return "redirect:/home";
    }
    
    @GetMapping("/home")
    public String home(Model model, HttpSession session) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            
            String email = auth.getName();
            User user = userService.getUser(email);
            session.setAttribute("currentUser", user);
            session.setAttribute("page", 1);
        }
        
        return "home";
    }
    
    @GetMapping("/home/follow")
    public String homeFollow(Model model, HttpSession session) {
        
        return "home";
    }
}
