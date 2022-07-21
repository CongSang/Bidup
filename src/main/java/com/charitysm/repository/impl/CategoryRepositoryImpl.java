/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repository.impl;

import com.charitysm.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author CÔNG SANG
 */
@Repository
@Transactional
public class CategoryRepositoryImpl implements CategoryRepository {
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    
}
