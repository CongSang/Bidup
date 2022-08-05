package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.ReactNotifPK;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-05T18:34:50")
@StaticMetamodel(ReactNotif.class)
public class ReactNotif_ { 

    public static volatile SingularAttribute<ReactNotif, ReactNotifPK> reactNotifPK;
    public static volatile SingularAttribute<ReactNotif, Date> createdDate;
    public static volatile SingularAttribute<ReactNotif, Post> post;
    public static volatile SingularAttribute<ReactNotif, Short> isRead;
    public static volatile SingularAttribute<ReactNotif, User> user;

}