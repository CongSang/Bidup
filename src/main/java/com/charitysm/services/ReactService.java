/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.services;

import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactComment;
import com.charitysm.pojo.User;

/**
 *
 * @author ADMIN
 */
public interface ReactService {

    boolean createReact(React r);

    void createReactComment(int commentId, User u);

    void deleteReact(String userId, int postId);

    void deleteReactComment(String userId, int commentId);

    React findReact(String userId, int postId);

    long countReactStats(int month, int year);
}
