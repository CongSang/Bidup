/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Bid;
import com.charitysm.repositories.BidRepository;
import java.sql.SQLException;
import java.util.List;
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
public class BidRepositoryImpl implements BidRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public Bid createBid(Bid b){
        Session session = sessionFactory.getObject().getCurrentSession();
        session.save(b);
        return b;
    }

    @Override
    public boolean deleteBid(Bid b) {
        Session session = sessionFactory.getObject().getCurrentSession();
        try {
            session.delete(b);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Bid findBid(String userId, int auctionId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("Bid.findForUser");
        q.setParameter("userId", userId);
        q.setParameter("auctionId", auctionId);

        return (Bid) q.getSingleResult();
    }

    @Override
    public boolean updateBid(Bid b) {
        Session session = sessionFactory.getObject().getCurrentSession();
        try {
            session.update(b);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Bid> getBids(int auctionId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("Bid.findByAuctionId");
        q.setParameter("auctionId", auctionId);
        
        System.out.println(q.getResultList());
        return q.getResultList();
    }

    @Override
    public long getTopPrice(int auctionId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("SELECT money FROM Bid "
                + "WHERE auction_id=:auctionId "
                + "ORDER BY money DESC LIMIT 1");
        q.setParameter("auctionId", auctionId);
        
        return Long.parseLong(q.getSingleResult().toString());
    }

}
