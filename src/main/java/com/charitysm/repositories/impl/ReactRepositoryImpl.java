/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactComment;
import com.charitysm.pojo.ReactCommentPK;
import com.charitysm.pojo.ReactPK;
import com.charitysm.repositories.ReactRepository;
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
 * @author ADMIN
 */
@Repository
@Transactional
public class ReactRepositoryImpl implements ReactRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public boolean createReact(React r) {
        Session session = sessionFactory.getObject().getCurrentSession();
        return session.save(r) != null;
    }

    @Override
    public void deleteReact(String userId, int postId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        ReactPK rPK = new ReactPK(userId, postId);
        Query q = session.createQuery("DELETE FROM React WHERE reactPK=:rPK");
        q.setParameter("rPK", rPK);
        q.executeUpdate();
    }

    @Override
    public React findReact(String userId, int postId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createNamedQuery("React.findForUser");
        q.setParameter("userId", userId);
        q.setParameter("postId", postId);

        return (React) q.getSingleResult();
    }

    @Override
    public boolean createReactComment(ReactComment r) {
        Session session = sessionFactory.getObject().getCurrentSession();
        return session.save(r) != null;
    }

    @Override
    public void deleteReactComment(String userId, int commentId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        ReactCommentPK rPK = new ReactCommentPK(userId, commentId);
        Query q = session.createQuery("DELETE FROM ReactComment WHERE reactCommentPK=:rPK");
        q.setParameter("rPK", rPK);
        q.executeUpdate();
    }

    @Override
    public long countReactStats(int month, int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root rU = q.from(React.class);

        if (month == 0) {
            q.where(b.equal(b.function("YEAR", Integer.class, rU.get("createdDate")), year));
            q.multiselect(b.count(rU));
        } else if (year == 0) {
            q.where(b.equal(b.function("MONTH", Integer.class, rU.get("createdDate")), month));
            q.multiselect(b.count(rU));
        } else {
            q.where(
                    b.equal(b.function("MONTH", Integer.class, rU.get("createdDate")), month),
                    b.equal(b.function("YEAR", Integer.class, rU.get("createdDate")), year));
            q.multiselect(b.count(rU));
        }

        Query query = session.createQuery(q);
        return (long) query.getSingleResult();
    }

    @Override
    public List<Long> countReactMonthly(int year) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_countReactMonthly(:year)");
        q.setParameter("year", year);
        List<Long> rs = Arrays.asList(new Long[12]);
        Object[] qs =(Object[]) q.getSingleResult();
        for(int i = 0; i < 12; i++) {
            rs.set(i, Long.parseLong(qs[i].toString()));
        }
        return rs;
    }

}
