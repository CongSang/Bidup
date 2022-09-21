/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Comment;
import com.charitysm.repositories.CommentRepository;
import java.math.BigInteger;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
public class CommentRepositoryImpl implements CommentRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;

    @Override
    public int createComment(Comment c) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return (int) session.save(c);
    }

    @Override
    public void deleteComment(int id, String userId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Comment c = session.get(Comment.class, id);
        session.delete(c);
    }

    @Override
    public List<Comment> getComments(int postId, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();

        Query query = session.createNativeQuery("SELECT * FROM comment WHERE post_id= :postId ORDER BY comment_date DESC", Comment.class);
        query.setParameter("postId", postId);

        if (page > 0) {
            int size = Integer.parseInt(env.getProperty("comment.page.size").toString());
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        List<Comment> cs = query.getResultList();
        cs.forEach(c -> {
            c.setCommentSetLength(c.getCommentSet().size());
        });
        return cs;
    }

    @Override
    public Comment getCommentById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Comment c = session.get(Comment.class, id);
        c.setCommentSetLength(c.getCommentSet().size());
        return c;
    }

    @Override
    public BigInteger getCommentCount(int postId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createNativeQuery("SELECT COUNT(id) FROM comment WHERE post_id=:postId");
        q.setParameter("postId", postId);

        return (BigInteger) q.getSingleResult();
    }

    @Override
    public List<Comment> getReplies(int commentId, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Comment WHERE parentId.id=:commentId", Comment.class);
        q.setParameter("commentId", commentId);

        if (page > 0) {
            int size = Integer.parseInt(env.getProperty("comment.page.size").toString());
            int start = (page - 1) * size;
            q.setFirstResult(start);
            q.setMaxResults(size);
        }

        List<Comment> cs = q.getResultList();
        cs.forEach(c -> {
            c.setCommentSetLength(c.getCommentSet().size());
        });

        return cs;
    }

    @Override
    public long countCommentStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root rU = q.from(Comment.class);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("commentDate")), year));
            q.multiselect(b.count(rU));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("commentDate")), month));
            q.multiselect(b.count(rU));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("commentDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("commentDate")), year));
            q.multiselect(b.count(rU));
        }

        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }

    @Override
    public boolean editComment(Comment c) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.update(c);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
