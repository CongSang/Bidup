/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.React;
import com.charitysm.repositories.ReactRepository;
import com.charitysm.services.ReactService;
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
    
    @Override
    public void createReact(React r) {
        reactRepository.createReact(r);
    }

    @Override
    public void deleteReact(React r) {
        reactRepository.deleteReact(r);
    }

    @Override
    public React findReact(String userId, int postId) {
        return reactRepository.findReact(userId, postId);
    }
    
}
