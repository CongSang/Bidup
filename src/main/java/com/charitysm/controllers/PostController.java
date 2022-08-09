/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.services.PostService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author ADMIN
 */
@Controller
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;
    
    @GetMapping("/{postId}")
    public String getPost(@RequestParam Map<String, String> params,
            @PathVariable(value="postId") int postId, Model model) {
        //load post theo follow
//        User currentUser = (User)session.getAttribute("currentUser");
//        String userId = currentUser.getId();
        String t = params.get("notif_type");
        String nId = params.get("notif_id");
        if (t != null && nId != null) {
            NotifType type = NotifType.valueOf(t);
            int notifId = Integer.parseInt(nId);
        }
        Post p = this.postService.getPostById(postId);
        model.addAttribute("post", p);
        return "post";
    }
}
