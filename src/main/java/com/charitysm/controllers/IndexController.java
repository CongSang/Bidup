package com.charitysm.controllers;

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
    public String home(Model model) {
        return "home";
    }
}
