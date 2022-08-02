/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.User;
import com.charitysm.repositories.UserRepository;
import javax.persistence.Query;
import org.hibernate.Session;   
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author ADMIN
 */
@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private  LocalSessionFactoryBean sessionFactory;
    
    @Override
    public User getUser(String email) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM User WHERE email = :email");
        q.setParameter("email", email);
        
        return (User) q.getSingleResult();
    }

    @Override
    public User getUserById(String id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        User user = session.get(User.class, id);
        
        return (User)user;
    }
}
