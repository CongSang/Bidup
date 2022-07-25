package com.charitysm.controllers;

import com.restfb.types.User;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author CÔNG SANG
 */
@Controller
public class IndexController {

//    @Autowired
//    private CategoryService categoryService;
//
//    @RequestMapping("/")
//    public String index(Model model,
//            @RequestParam Map<String, String> params) {
//
//        model.addAttribute("categories", this.categoryService.getCategories());
//
//        return "index";
//    }

    @RequestMapping("/")
    public String home(Model model, HttpSession session) {
        User u = (User) session.getAttribute("current_user");
        model.addAttribute("user", u);
        return "home";
    }
}
