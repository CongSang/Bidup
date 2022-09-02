/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.controllers.NotificationCenter;
import com.charitysm.pojo.Comment;
import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactComment;
import com.charitysm.pojo.ReactCommentPK;
import com.charitysm.pojo.User;
import com.charitysm.repositories.ReactRepository;
import com.charitysm.services.CommentService;
import com.charitysm.services.ReactService;
import java.io.IOException;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class ReactServiceImpl implements ReactService {

    @Autowired
    private ReactRepository reactRepository;
    @Autowired
    private CommentService commentService;

    @Override
    public boolean createReact(React r) {
        return this.reactRepository.createReact(r);
    }

    @Override
    public void deleteReact(String userId, int postId) {
        this.reactRepository.deleteReact(userId, postId);
    }

    @Override
    public React findReact(String userId, int postId) {
        return this.reactRepository.findReact(userId, postId);
    }

    @Override
    public void createReactComment(int commentId, User u) {
        try {
            ReactComment react = new ReactComment();

            Comment c = this.commentService.getCommentById(commentId);
            ReactCommentPK rPK = new ReactCommentPK();
            rPK.setCommentId(commentId);
            rPK.setUserId(u.getId());
            react.setReactCommentPK(rPK);
            react.setComment(c);
            react.setUser(u);

            if (this.reactRepository.createReactComment(react) == true) {
                NotificationCenter.sendMessage(c.getUserId().getId());
            }
        } catch (IOException | EntityNotFoundException ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public void deleteReactComment(String userId, int commentId) {
        this.reactRepository.deleteReactComment(userId, commentId);
    }

    @Override
    public long countReactStats(int month, int year) {
        return this.reactRepository.countReactStats(month, year);
    }

}
