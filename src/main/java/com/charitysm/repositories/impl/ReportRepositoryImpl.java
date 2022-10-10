/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import com.charitysm.repositories.ReportRepository;
import java.util.Arrays;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.query.Query;
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
public class ReportRepositoryImpl implements ReportRepository {

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

    @Override
    public long countReportUserStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root rU = q.from(ReportUser.class);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
            q.multiselect(b.count(rU));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month));
            q.multiselect(b.count(rU));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
            q.multiselect(b.count(rU));
        }

        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }

    @Override
    public List<ReportPost> getReportPost(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<ReportPost> q = b.createQuery(ReportPost.class);

        Root rU = q.from(ReportPost.class);
        q.select(rU);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        }

        q.orderBy(b.desc(rU.get("reportedDate")));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

    @Override
    public List<ReportAuction> getReportAuction(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<ReportAuction> q = b.createQuery(ReportAuction.class);

        Root rU = q.from(ReportAuction.class);
        q.select(rU);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        }

        q.orderBy(b.desc(rU.get("reportedDate")));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

    @Override
    public List<ReportUser> getReportUser(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<ReportUser> q = b.createQuery(ReportUser.class);

        Root rU = q.from(ReportUser.class);
        q.select(rU);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("reportedDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("reportedDate")), year));
        }

        q.orderBy(b.desc(rU.get("reportedDate")));

        Query query = session.createQuery(q);
        return query.getResultList();
    }

    @Override
    public boolean deleteReportUser(int reportId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        try {
            ReportUser r = session.get(ReportUser.class, reportId);
            session.delete(r);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Long> countReportUserMonthly(int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_countReportUserMonthly(:year)");
        q.setParameter("year", year);
        List<Long> rs = Arrays.asList(new Long[12]);
        Object[] qs =(Object[]) q.getSingleResult();
        for(int i = 0; i < 12; i++) {
            rs.set(i, Long.parseLong(qs[i].toString()));
        }
        return rs;
    }

}
