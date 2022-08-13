/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.Comment;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public interface CommentRepository {
    int createComment(Comment c);
    void deleteComment(int id);
    List<Comment> getComments(int postId, int page);
    Comment getCommentById(int id);
    long countCommentStats(int month, int year);
}
