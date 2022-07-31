/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.React;
import com.charitysm.repositories.ReactRepository;
import org.hibernate.Session;
import org.hibernate.query.Query;
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
public class ReactRepositoryImpl implements ReactRepository{
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    
    @Override
    public void createReact(React r) {
        Session session = sessionFactory.getObject().getCurrentSession();
        session.save(r);
    }

    @Override
    public void deleteReact(React r) {
        Session session = sessionFactory.getObject().getCurrentSession();
        session.delete(r);
    }

    @Override
    public React findReact(String userId, int postId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("React.findForUser");
        q.setParameter("userId", userId);
        q.setParameter("postId", postId);
        
        return (React)q.getSingleResult();
    }
    
}
