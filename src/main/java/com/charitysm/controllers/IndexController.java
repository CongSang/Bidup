/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    
    @RequestMapping("/test")
    public String test(Model model) {
        return "test";
    }
}
