/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.repositories.PostRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
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
@PropertySource("classpath:messages.properties")
@Transactional
public class PostRepositoryImpl implements PostRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;

    @Override
    public List<Post> getPosts(Map<String, String> params) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Post> q = b.createQuery(Post.class);
        Root root = q.from(Post.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();
            String hashtagKw = params.get("hashtag");
            if (hashtagKw != null && !hashtagKw.isBlank()) {
                Predicate p = b.like(root.get("hashtag").as(String.class),String.format("%%%s%%", "#" + hashtagKw + " "));
                predicates.add(p);
            }
            
            String contentKw = params.get("kw");
            if (contentKw != null && !contentKw.isBlank()) {
                Predicate p = b.like(root.get("content").as(String.class),String.format("%%%s%%", contentKw));
                predicates.add(p);
            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        
        q.orderBy(b.desc(root.get("postedDate")));

        Query query = session.createQuery(q);
        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        int size = Integer.parseInt(params.getOrDefault("limit", env.getProperty("page.size")));
        if (page > 0){
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        List<Post> rs = query.getResultList();
        rs.forEach(p -> {
            p.setCommentSetLength(p.getCommentSet().size());
        });
        
        return rs;
    }

    @Override
    public long countPostStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        
        Root rU = q.from(Post.class);
        
        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("postedDate")), year));
            q.multiselect(b.count(rU));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("postedDate")), month));
            q.multiselect(b.count(rU));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("postedDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("postedDate")), year));
            q.multiselect(b.count(rU));
        }
        
        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }
    
    @Override
    public Post getPostById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("Post.findById");
        q.setParameter("id", id);
        Post p = (Post)q.getSingleResult();
        p.setCommentSetLength(p.getCommentSet().size());
        
        return p;
    }

    @Override
    public int createPost(Post p) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            return (int) session.save(p);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public void deletePost(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Post p = session.get(Post.class, id);
        session.delete(p);
    }

    @Override
    public int updatePost(Post p) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        session.update(p);
        return p.getId();
    }

    @Override
    public List<Post> getUserPosts(String userId, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        User u = session.get(User.class, userId);
        
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Post> q = b.createQuery(Post.class);
        Root root = q.from(Post.class);
        q.select(root);
        
        q.where(b.equal(root.get("userId"), u));
        q.orderBy(b.desc(root.get("postedDate")));

        Query query = session.createQuery(q);
        if (page > 0) {
            int size = Integer.parseInt(env.getProperty("page.size").toString());
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        List<Post> rs = query.getResultList();
        rs.forEach(p -> {
            p.setCommentSetLength(p.getCommentSet().size());
        });
        
        return rs;
    }

    @Override
    public Post findPostByCommentId(int commentId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createNativeQuery("CALL sp_findPostByCommentId(:commentId)", Post.class);
        q.setParameter("commentId", commentId);
//        Object[] o =(Object[]) ;
        
        Post p = (Post) q.getSingleResult();
        p.setCommentSetLength(p.getCommentSet().size());
//        p.setId(Integer.parseInt(o[0].toString()));
//        p.setContent(o[1].toString());
//        p.setImage(o[2].toString());
//        p.setPostedDate(new Date(o[3].toString()));
//        p.setUserId(new User(o[4].toString()));
//        p.setActive(Short.parseShort(o[5].toString()));
//        p.setHashtag(o[6].toString());
        
        return p;
    }

}
