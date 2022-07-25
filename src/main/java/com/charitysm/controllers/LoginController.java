package com.charitysm.controllers;

import com.charitysm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
//    @PostMapping(value = "/login")
//    public String addProductProcess(Model model,
//            @ModelAttribute(value = "user") @Valid User user,
//            BindingResult result, HttpServletRequest request) {
//        if (result.hasErrors()) {
//            
//            return "login";
//        }
//            
//            return "redirect:/login";
//    }
    
    @GetMapping("/logout")
    public void logout(HttpSession session, HttpServletResponse response) throws IOException {
        session.removeAttribute("current_user");
        response.sendRedirect("login"); 
    }
}
