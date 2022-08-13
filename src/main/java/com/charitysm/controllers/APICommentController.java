/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.ReactComment;
import com.charitysm.pojo.ReactCommentPK;
import com.charitysm.pojo.User;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.pojo.reobj.CommentRequest;
import com.charitysm.services.CommentService;
import com.charitysm.services.PostService;
import com.charitysm.services.ReactService;
import com.charitysm.utils.NotificationCenter;
import java.math.BigInteger;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ADMIN
 */
@RestController
@RequestMapping("/api")
public class APICommentController {
    @Autowired
    private PostService postService;
    @Autowired
    private ReactService reactService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private NotificationCenter notificationCenter;

    @Async
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(value = "/delete-comment/{id}")
    public void deleteComment(@PathVariable(value = "id") int id) {
        this.commentService.deleteComment(id);
    }

    @Async
    @PostMapping(value = "/create-comment")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest c
            , HttpSession session) {
        Comment comm = new Comment();
        comm.setContent(c.getContent());
        comm.setCommentDate(new Date());
        Post p = this.postService.getPostById(c.getPostId());
        User u = (User) session.getAttribute("currentUser");
        comm.setPostId(p);
        comm.setUserId(u);
        if (this.commentService.createComment(comm) < 1) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        System.out.println("Userid1: " + u.getId());
        System.out.println("Userid2: " + comm.getUserId().getId());
        if (!p.getUserId().getId().equals(u.getId())) {
            this.notificationCenter.updateNotif(c.getPostId(), NotifType.COMMENT_POST);
        }
        return new ResponseEntity<>(comm, HttpStatus.CREATED);
    }

    @Async
    @GetMapping(value = "/get-comments")
    public ResponseEntity<List<Comment>> getComments(@RequestParam(value = "page") int page
            , @RequestParam(value = "postId") int postId) {
        return new ResponseEntity<>(this.commentService.getComments(postId, page), HttpStatus.OK);
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create-react-comment/{commentId}")
    public void createCommentReact(@PathVariable(value="commentId") int commentId, HttpSession session) {
        ReactComment react = new ReactComment();
        react.setType((short)1);
//
        Comment c = this.commentService.getCommentById(commentId);
        User u = (User)session.getAttribute("currentUser");
        ReactCommentPK rPK = new ReactCommentPK();
        rPK.setCommentId(commentId);
        rPK.setUserId(u.getId());
//
        react.setReactCommentPK(rPK);
        react.setComment(c);
        react.setUser(u);
        react.setCreatedDate(new Date());
        if(this.reactService.createReactComment(react) == true && !c.getUserId().getId().equals(u.getId()))
            this.notificationCenter.updateNotif(commentId, NotifType.REACT_COMMENT);
    }
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-react-comment/{commentId}")
    public void deleteReact(@PathVariable(value="commentId") int commentId, HttpSession session) {
        User u = (User)session.getAttribute("currentUser");
        this.reactService.deleteReactComment(u.getId(), commentId);
    }
    
    @Async
    @GetMapping(value = "/get-comment-count/{postId}")
    public ResponseEntity<BigInteger> getComments(@PathVariable(value="postId") int postId) {
        Map<String,String> data = new HashMap<>();
//        System.out.println("count: "+ count);
//        data.put("count", "" + count);
        return new ResponseEntity<>(this.commentService.getCommentCount(postId), HttpStatus.OK);
    }
    
    @Async
    @GetMapping(value = "/get-replies")
    public ResponseEntity<List<Comment>> getReplies(@RequestParam(value = "page") int page
            , @RequestParam(value = "commentId") int commentId) {
        return new ResponseEntity<>(this.commentService.getReplies(commentId, page), HttpStatus.OK);
    }
    
}
