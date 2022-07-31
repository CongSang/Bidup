/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.CommentRequest;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactPK;
import com.charitysm.pojo.ReactRequest;
import com.charitysm.pojo.User;
import com.charitysm.services.CommentService;
import com.charitysm.services.PostService;
import com.charitysm.services.ReactService;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @Autowired
    private ReactService reactService;
    
    @Async
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts(@RequestParam("page") int page) {
        //load post theo follow
//        User currentUser = (User)session.getAttribute("currentUser");
//        String userId = currentUser.getId();
        return new ResponseEntity<>(this.postService.getPosts(null, page), HttpStatus.OK);
    }
    
    @Async
    @PostMapping("/create-comment")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest c, HttpSession session) {
        Comment comm = new Comment();
        comm.setContent(c.getContent());
        comm.setCommentDate(new Date());
        
        Post p = postService.getPostById(c.getPostId());
        User u = (User)session.getAttribute("currentUser");
        
        comm.setPostId(p);
        comm.setUserId(u);
        
        return new ResponseEntity<>(commentService.createComment(comm), HttpStatus.CREATED);
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create-react")
    public void createReact(@RequestBody ReactRequest r, HttpSession session) {
        React react = new React();
        react.setType((short)1);

        Post p = postService.getPostById(r.getPostId());
        User u = (User)session.getAttribute("currentUser");
        ReactPK rPK = new ReactPK();
        rPK.setPostId(r.getPostId());
        rPK.setUserId(u.getId());

        react.setReactPK(rPK);
        react.setPost(p);
        react.setUser(u);

        reactService.createReact(react);
    }
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-react")
    public void deleteReact(@RequestBody ReactRequest r, HttpSession session) {
        User u = (User)session.getAttribute("currentUser");
        React react = reactService.findReact(u.getId(), r.getPostId());
        if (react != null)
            reactService.deleteReact(react);
    }
}
