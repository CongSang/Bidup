package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-05T18:34:50")
@StaticMetamodel(CommentNotif.class)
public class CommentNotif_ { 

    public static volatile SingularAttribute<CommentNotif, Date> createdDate;
    public static volatile SingularAttribute<CommentNotif, Short> isRead;
    public static volatile SingularAttribute<CommentNotif, Integer> id;
    public static volatile SingularAttribute<CommentNotif, Post> postId;
    public static volatile SingularAttribute<CommentNotif, User> userId;

}