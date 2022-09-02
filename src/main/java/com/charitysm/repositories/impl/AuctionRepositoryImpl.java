/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.User;
import com.charitysm.repositories.AuctionRepository;
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
public class AuctionRepositoryImpl implements AuctionRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    @Autowired
    private Environment env;

    @Override
    public List<Auction> getAuctionSideBar() {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Auction a ORDER BY a.auctionDate DESC").setMaxResults(10);

        return q.getResultList();
    }

    @Override
    public List<Auction> getAuctions(Map<String, String> params) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Auction> q = b.createQuery(Auction.class);
        Root root = q.from(Auction.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();
            String hashtagKw = params.get("hashtag");
            if (hashtagKw != null && !hashtagKw.isEmpty()) {
                Predicate p = b.like(root.get("hashtag").as(String.class), String.format("%%%s%%", hashtagKw));
                predicates.add(p);
            }

            String contentKw = params.get("kw");
            if (contentKw != null && !contentKw.isBlank()) {
                Predicate p = b.like(root.get("content").as(String.class), String.format("%%%s%%", contentKw));
                predicates.add(p);
            }

            q.where(predicates.toArray(Predicate[]::new));
        }

        q.orderBy(b.desc(root.get("auctionDate")));

        Query query = session.createQuery(q);
        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        int size = Integer.parseInt(params.getOrDefault("size", env.getProperty("page.size")));
        if (page > 0) {
            int start = (page - 1) * size;
            query.setFirstResult(start);
            query.setMaxResults(size);
        }
        return query.getResultList();
    }

    @Override
    public Auction getAuctionById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("Auction.findById");
        q.setParameter("id", id);

        return (Auction) q.getSingleResult();
    }

    @Override
    public void deleteAuction(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            Auction auction = session.get(Auction.class, id);
            session.delete(auction);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int createAuction(Auction a) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return (int) session.save(a);
    }

    @Override
    public int updateAuction(Auction a) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.update(a);
            return a.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int confirmCompleteCharity(Auction a) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.update(a);
            return a.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public void sendEmailAuction(Auction a) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.update(a);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Auction> getUserAuction(String userId, int page) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        User u = session.get(User.class, userId);

        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Auction> q = b.createQuery(Auction.class);
        Root root = q.from(Auction.class);
        q.select(root);

        q.where(b.equal(root.get("userId"), u));
        q.orderBy(b.desc(root.get("auctionDate")));

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
    public long countAuctionStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root rU = q.from(Auction.class);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("auctionDate")), year));
            q.multiselect(b.count(rU));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("auctionDate")), month));
            q.multiselect(b.count(rU));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("auctionDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("auctionDate")), year));
            q.multiselect(b.count(rU));
        }

        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }
}
