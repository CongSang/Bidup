/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactComment;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public interface ReactRepository {

    boolean createReact(React r);

    boolean createReactComment(ReactComment r);

    boolean deleteReact(React r);

    boolean deleteReactComment(ReactComment r);

    React findReact(String userId, int postId);
    
    ReactComment findReactComment(String userId, int commentId);

    long countReactStats(int month, int year);
    
    List<Long> countReactMonthly(int year);
}
