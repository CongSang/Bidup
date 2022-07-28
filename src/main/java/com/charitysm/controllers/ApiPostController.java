/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.CommentRequest;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.services.PostService;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class ApiPostController {
    @Autowired
    private PostService postService;
    
    @Async
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts(HttpSession session) {
        User currentUser = (User)session.getAttribute("currentUser");
        int page = Integer.parseInt(session.getAttribute("page").toString());
   
        String userId = currentUser.getId();
        ResponseEntity<List<Post>> res = new ResponseEntity<>(this.postService.getPosts(null, page), HttpStatus.OK);
        session.setAttribute("page", ++page);
        System.out.println(page);
        return res;
    }
    
    @Async
    @PostMapping("/add-comment")
    public ResponseEntity<CommentRequest> addComment(@RequestBody CommentRequest c) {
        return new ResponseEntity<>(c, HttpStatus.OK);
    }
}
