/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.User;
import com.charitysm.repositories.UserRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import javax.persistence.NoResultException;
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
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;

    @Override
    public User getUser(String email) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM User u WHERE u.email = :email AND u.active = 1");
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
    public boolean registerNewUser(User user) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public List<User> getUsers(Map<String, String> params) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM User "
                + "WHERE LOWER(CONCAT(firstname,' ',lastname)) like :name "
                + "OR LOWER(email) like :email ");
        String kw = params.get("kw");
        if (kw == null || kw.isBlank()) {
            kw = "";
        }
        q.setParameter("name", String.format("%%%s%%", kw.toLowerCase()));
        q.setParameter("email", String.format("%%%s%%", kw.toLowerCase()));

        int limit = Integer.parseInt(params.getOrDefault("limit", env.getProperty("page.size")));

        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        if (page > 0) {
            int start = (page - 1) * limit;
            q.setFirstResult(start);
            q.setMaxResults(limit);
        }

        return q.getResultList();
    }

    @Override
    public long countUserStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root rU = q.from(User.class);
        
        if (year == 0) {
            q.multiselect(b.count(rU));
        } else if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("createdDate")), year),
                    b.equal(rU.get("userRole"), "ROLE_USER"));
            q.multiselect(b.count(rU));
        }  else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("createdDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("createdDate")), year),
                    b.equal(rU.get("userRole"), "ROLE_USER"));
            q.multiselect(b.count(rU));
        }

        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }
    
    public List<Long> countUserMonthly(int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_countUserMonthly(:year)");
        q.setParameter("year", year);
        List<Long> rs = Arrays.asList(new Long[12]);
        Object[] qs =(Object[]) q.getSingleResult();
        for(int i = 0; i < 12; i++) {
            rs.set(i, Long.parseLong(qs[i].toString()));
        }
        return rs;
    }

    @Override
    public User getActiveUser(String email) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        User user;

        try {
            user = (User) session.createQuery("FROM User WHERE email = :email")
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            user = null;
        }
        return user;
    }

    @Override
    public boolean followUser(String followerId, String followedId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            Query q = session.createSQLQuery("INSERT INTO follow VALUES(:followerId, :followedId)");
            q.setParameter("followerId", followerId);
            q.setParameter("followedId", followedId);

            q.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean checkFollowed(String followerId, String followedId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("SELECT * From follow WHERE follower_id=:followerId"
                + " AND followed_id=:followedId");
        q.setParameter("followerId", followerId);
        q.setParameter("followedId", followedId);
        try {
            Object o = q.getSingleResult();
            if (o != null) {
                return true;
            }
        } catch (NoResultException e) {
            return false;
        }

        return false;
    }

    @Override
    public boolean unFollowUser(String followerId, String followedId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("DELETE FROM follow WHERE follower_id=:followerId"
                + " AND followed_id=:followedId");
        q.setParameter("followerId", followerId);
        q.setParameter("followedId", followedId);
        try {
            q.executeUpdate();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean editUserInfo(User u) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.update(u);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean deleteUser(String userId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            Query q = session.createQuery("DELETE FROM User WHERE id=:id");
            q.setParameter("id", userId);
            q.executeUpdate();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean blockAccount(String userId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            User user = session.get(User.class, userId);
            user.setActive((short)0);
            session.update(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
