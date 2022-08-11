/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.User;
import com.charitysm.repositories.UserRepository;
import java.util.List;
import java.util.Map;
import javax.persistence.Query;
import org.hibernate.Session;
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
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;

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

        return (User) user;
    }

    @Override
    public List<User> getUsers(Map<String, String> params) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM User WHERE LOWER(CONCAT(firstname,' ',lastname)) like :name");
        String kw = params.get("kw");
        if (kw == null || kw.isBlank())
            kw = "";
        q.setParameter("name", String.format("%%%s%%", kw.toLowerCase()));
        
        int limit = Integer.parseInt(params.getOrDefault("limit", env.getProperty("page.size")));
        
        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        if (page > 0) {
            int start = (page - 1) * limit;
            q.setFirstResult(start);
            q.setMaxResults(limit);
        }
        
        return q.getResultList();
    }
}
