/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Comment;
import com.charitysm.repositories.CommentRepository;
import javax.persistence.criteria.CriteriaBuilder;
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
public class CommentRepositoryImpl implements CommentRepository{
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    
    @Override
    public int createComment(Comment c) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return (int)session.save(c);
    }

    @Override
    public void deleteComment(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Comment c = session.get(Comment.class, id);
        session.delete(c);
    }
    
}
