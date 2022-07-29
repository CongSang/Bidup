/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.CommentRequest;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.services.CommentService;
import com.charitysm.services.PostService;
import java.util.Date;
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
    @Autowired
    private CommentService commentService;
    
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
    @PostMapping("/create-comment")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest c, HttpSession session) {
        Comment comm = new Comment();
        comm.setContent(c.getContent());
        comm.setCommentDate(new Date());
        
        Post p = postService.getPostById(c.getPostId());
        User u = (User)session.getAttribute("currentUser");
        
        comm.setPostId(p);
        comm.setUserId(u);
        
        return new ResponseEntity<>(commentService.createComment(comm), HttpStatus.CREATED);
    }
}
