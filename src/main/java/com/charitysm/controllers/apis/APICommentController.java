/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers.apis;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.User;
import com.charitysm.pojo.reobj.CommentRequest;
import com.charitysm.services.CommentService;
import com.charitysm.services.ReactService;
import java.io.IOException;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    private ReactService reactService;
    @Autowired
    private CommentService commentService;

    @Async
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(value = "/delete-comment/{id}")
    public void deleteComment(@PathVariable(value = "id") int id, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");
        Comment c = this.commentService.getCommentById(id);
        if (c.getUserId().getId() != u.getId())
            return;
        this.commentService.deleteComment(id, u.getId());
    }

    @Async
    @PostMapping(value = "/create-comment")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest cq
            , HttpSession session) {
        
        User u = (User) session.getAttribute("currentUser");
        Comment c = this.commentService.createComment(cq, u);
        if (c == null) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

    @Async
    @GetMapping(value = "/get-comments")
    public ResponseEntity<List<Comment>> getComments(@RequestParam(value = "page") int page
            , @RequestParam(value = "postId") int postId) {
        return new ResponseEntity<>(this.commentService.getComments(postId, page), HttpStatus.OK);
    }
    
    @Async
    @GetMapping(path = "/get-comment/{commentId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Comment> getComment(@PathVariable(value="commentId") int commentId) {
        return new ResponseEntity<>(this.commentService.getCommentById(commentId), HttpStatus.OK);
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create-react-comment/{commentId}")
    public void createCommentReact(@PathVariable(value="commentId") int commentId, HttpSession session) {
        
        User u = (User)session.getAttribute("currentUser");
        
        this.reactService.createReactComment(commentId, u);
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
        return new ResponseEntity<>(this.commentService.getCommentCount(postId), HttpStatus.OK);
    }
    
    @Async
    @GetMapping(value = "/get-replies")
    public ResponseEntity<List<Comment>> getReplies(@RequestParam(value = "page") int page
            , @RequestParam(value = "commentId") int commentId) {
        return new ResponseEntity<>(this.commentService.getReplies(commentId, page), HttpStatus.OK);
    }
    
    @Async
    @PutMapping("/edit-comment/{id}")
    public ResponseEntity<Comment> editComment(@PathVariable(value="id") int id
            , @RequestBody CommentRequest req, HttpSession session) throws IOException {
        User u = (User)session.getAttribute("currentUser");
        Comment c = this.commentService.getCommentById(id);
        
        if (u != null && c.getUserId().getId().equals(u.getId())) {
            Comment res = this.commentService.editComment(req, id);
            if(res != null)
                return new ResponseEntity<>(res, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
