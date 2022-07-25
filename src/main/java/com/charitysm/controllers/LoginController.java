package com.charitysm.controllers;

import com.charitysm.pojo.User;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class LoginController {

    @RequestMapping("/login")
    public String login(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        
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
