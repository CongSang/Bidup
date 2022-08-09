/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Comment;
import com.charitysm.repositories.CommentRepository;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author ADMIN
 */
@Repository
@Transactional
@PropertySource("classpath:messages.properties")
public class CommentRepositoryImpl implements CommentRepository{
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;
    
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

    @Override
    public List<Comment> getComments(int postId, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        
        Query query = session.createNativeQuery("SELECT * FROM comment WHERE post_id= :postId", Comment.class);
        query.setParameter("postId", postId);
        
        if (page > 0) {
            int size = Integer.parseInt(env.getProperty("comment.page.size").toString());
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        return query.getResultList();
    }
    
}
