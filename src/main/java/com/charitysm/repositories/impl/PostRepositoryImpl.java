/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Post;
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
    public List<Post> getPosts(Map<String, String> params, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Post> q = b.createQuery(Post.class);
        Root root = q.from(Post.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();
            String hashtagKw = params.get("kw");
            if (hashtagKw != null && !hashtagKw.isEmpty()) {
                Predicate p = b.like(root.get("hashtag").as(String.class), String.format("%%%s%%", hashtagKw));
                predicates.add(p);
            }

            q.where(predicates.toArray(Predicate[]::new));
        }
        
        q.orderBy(b.desc(root.get("postedDate")));

        Query query = session.createQuery(q);
        if (page > 0) {
            int size = Integer.parseInt(env.getProperty("page.size").toString());
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        return query.getResultList();
    }

    @Override
    public int countPosts() {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("SELECT COUNT(*) FROM Post");

        return Integer.parseInt(q.getSingleResult().toString());
    }
    
    @Override
    public Post getPostById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("Post.findById");
        q.setParameter("id", id);
        
        return (Post)q.getSingleResult();
    }

    @Override
    public int createPost(Post p) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return (int) session.save(p);
    }

}
