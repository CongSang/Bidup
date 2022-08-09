/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import com.charitysm.repositories.ReportRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author CÔNG SANG
 */
@Repository
@Transactional
public class ReportRepositoryImpl implements ReportRepository{
    
    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public void createPostReport(ReportPost report) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            session.save(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void createAuctionReport(ReportAuction report) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
         try {
            session.save(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void createUserReport(ReportUser report) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
         try {
            session.save(report);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
