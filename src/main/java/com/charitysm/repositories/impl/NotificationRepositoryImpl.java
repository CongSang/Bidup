/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.CommentNotif;
import com.charitysm.pojo.PostNotif;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.repositories.NotificationRepository;
import java.util.List;
import java.util.Map;
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
public class NotificationRepositoryImpl implements NotificationRepository {

    @Autowired
    private Environment env;
    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public List<Object[]> getNotifs(String userId, Map<String, String> params) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_userGetNotifs(:userId, :start, :limit)");
        q.setParameter("userId", userId);

        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        int size = Integer.parseInt(params.getOrDefault("limit", env.getProperty("comment.page.size")));
        if (page > 0) {
            int start = (page - 1) * size;
            q.setParameter("start", start);
            q.setParameter("limit", size);
        }

        return q.getResultList();
    }

    @Override
    public void updateNotif(int targetId, NotifType type) {
        Session session = sessionFactory.getObject().getCurrentSession();
        if (type.equals(NotifType.REACT_POST) || type.equals(NotifType.COMMENT_POST)) {
            Query q = session.createSQLQuery("CALL sp_updateNotif(:postId, :type)");
            q.setParameter("postId", targetId);
            q.setParameter("type", type.toString());
            q.executeUpdate();
        } else if (type.equals(NotifType.REACT_COMMENT) || type.equals(NotifType.REPLY_COMMENT)) {
            Query q = session.createSQLQuery("CALL sp_updateCommentNotif(:commentId, :type)");
            q.setParameter("commentId", targetId);
            q.setParameter("type", type.toString());
            q.executeUpdate();
        } else {

        }
    }

    @Override
    public void updateAuctionNotif(int postId, NotifType type) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_updateAuctionNotif(:auctionId, :type)");
        q.setParameter("auctionId", postId);
        q.setParameter("type", type.toString());
        q.executeUpdate();
    }

    @Override
    public void readNotif(int notifId, NotifType type) {
        Session session = sessionFactory.getObject().getCurrentSession();
        if (type.equals(NotifType.REACT_POST) || type.equals(NotifType.COMMENT_POST) || type.equals(NotifType.JOIN_AUCTION)) {
            Query q = session.createNamedQuery("PostNotif.findById");
            q.setParameter("id", notifId);
            PostNotif pn = (PostNotif) q.getSingleResult();

            pn.setIsRead(true);
            session.update(pn);
        } else {
            CommentNotif cn = session.get(CommentNotif.class, notifId);
            cn.setIsRead(true);
            session.update(cn);
        }
    }

}
