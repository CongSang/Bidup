/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.controllers.HomeSocketController;
import com.charitysm.controllers.NotificationCenter;
import com.charitysm.pojo.Comment;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.CommentRequest;
import com.charitysm.pojo.communicateObj.NotifMessage;
import com.charitysm.repositories.CommentRepository;
import com.charitysm.services.CommentService;
import com.charitysm.services.PostService;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityNotFoundException;
import javax.websocket.EncodeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostService postService;

    @Override
    public Comment createComment(CommentRequest cq, User u) {
        try {
            Comment c = new Comment();
            c.setContent(cq.getContent());
            c.setCommentDate(new Date());
            Post p;
            Comment parent;
            c.setUserId(u);
            if (cq.getPostId() != 0) {
                p = this.postService.getPostById(cq.getPostId());
                c.setPostId(p);
                if (this.commentRepository.createComment(c) > 0) {
                    NotificationCenter.sendMessage(p.getUserId().getId(), new NotifMessage(111, null));
                    HomeSocketController.broadcast(new NotifMessage(112, c));
                    return c;
                }
            } else {
                parent = this.commentRepository.getCommentById(cq.getCommentId());
                c.setParentId(parent);
                if (this.commentRepository.createComment(c) > 0) {
                    NotificationCenter.sendMessage(parent.getUserId().getId(), new NotifMessage(111, null));
                    HomeSocketController.broadcast(new NotifMessage(112, c));
                    return c;
                }
            }

        } catch (IOException | EntityNotFoundException | EncodeException ex) {
            Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        return null;
    }

    @Override
    public void deleteComment(int id) {
        Comment c = this.commentRepository.getCommentById(id);
        
        if(this.commentRepository.deleteComment(c)) {
            try {
                HomeSocketController.broadcast(new NotifMessage(114, c));
            } catch (IOException ex) {
                Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            } catch (EncodeException ex) {
                Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @Override
    public List<Comment> getComments(int postId, int page) {
        return this.commentRepository.getComments(postId, page);
    }

    @Override
    public Comment getCommentById(int id) {
        try {
            return this.commentRepository.getCommentById(id);
        } catch (EntityNotFoundException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public BigInteger getCommentCount(int postId) {
        return this.commentRepository.getCommentCount(postId);
    }


    @Override
    public List<Comment> getReplies(int commentId, int page) {
        return this.commentRepository.getReplies(commentId, page);
    }

    @Override
    public Comment editComment(CommentRequest req, int commentId) {
        Comment currentComment = this.commentRepository.getCommentById(commentId);
        currentComment.setContent(req.getContent());
        currentComment.setCommentDate(new Date());

        if (this.commentRepository.editComment(currentComment)) {
            try {
                HomeSocketController.broadcast(new NotifMessage(113, currentComment));
                
                return currentComment;
            } catch (IOException ex) {
                Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            } catch (EncodeException ex) {
                Logger.getLogger(CommentServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }
}
