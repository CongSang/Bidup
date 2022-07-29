/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.Comment;
import com.charitysm.repositories.CommentRepository;
import com.charitysm.services.CommentService;
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
    public Comment createComment(Comment c) {
        return commentRepository.createComment(c);
    }
    
}
