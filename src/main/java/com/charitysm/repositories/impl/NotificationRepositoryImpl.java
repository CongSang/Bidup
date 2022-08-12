/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.repositories.impl;

import com.charitysm.pojo.PostNotif;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.repositories.NotificationRepository;
import java.util.List;
import java.util.Map;
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
public class NotificationRepositoryImpl implements NotificationRepository{
    @Autowired
    private LocalSessionFactoryBean sessionFactory;
    
    @Override
    public List<Object[]> getNotifs(String userId) {
        Session session = sessionFactory.getObject().getCurrentSession();
        Query q = session.createSQLQuery("CALL sp_userGetNotifs(:userId)");
        q.setParameter("userId", userId);
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
        }
        else if (type.equals(NotifType.REACT_COMMENT) || type.equals(NotifType.REPLY_COMMENT)) {
            Query q = session.createSQLQuery("CALL sp_updateCommentNotif(:commentId, :type)");
            q.setParameter("commentId", targetId);
            q.setParameter("type", type.toString());
            q.executeUpdate();
        } else {
            
        }
    }

    @Override
    public void readNotif(int notifId, NotifType type) {
        Session session = sessionFactory.getObject().getCurrentSession();
        if (type.equals(NotifType.REACT_POST) || type.equals(NotifType.COMMENT_POST)) {
            PostNotif pn = session.get(PostNotif.class, notifId);
            pn.setIsRead(true);
            session.update(pn);
        }
    }
    
}
