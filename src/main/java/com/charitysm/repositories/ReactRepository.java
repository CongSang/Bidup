/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.React;

/**
 *
 * @author ADMIN
 */
public interface ReactRepository {
    void createReact(React r);
    void deleteReact(React r);
    React findReact(String userId, int postId);
}
