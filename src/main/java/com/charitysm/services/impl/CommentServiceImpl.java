/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.Comment;
import com.charitysm.repositories.CommentRepository;
import com.charitysm.services.CommentService;
import java.math.BigInteger;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    
    @Override
    public int createComment(Comment c) {
        return this.commentRepository.createComment(c);
    }

    @Override
    public void deleteComment(int id) {
        this.commentRepository.deleteComment(id);
    }

    @Override
    public List<Comment> getComments(int postId, int page) {
        return this.commentRepository.getComments(postId, page);
    }

    @Override
    public Comment getCommentById(int id) {
        return this.commentRepository.getCommentById(id);
    }

    @Override
    public BigInteger getCommentCount(int postId) {
        return this.commentRepository.getCommentCount(postId);
    }
    
    @Override
    public List<Comment> getReplies(int commentId, int page) {
        return this.commentRepository.getReplies(commentId, page);
    }
}
