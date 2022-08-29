package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-20T13:53:35")
=======
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-29T19:03:05")
>>>>>>> main
@StaticMetamodel(CommentNotif.class)
public class CommentNotif_ { 

    public static volatile SingularAttribute<CommentNotif, Boolean> isRead;
    public static volatile SingularAttribute<CommentNotif, Comment> commentId;
    public static volatile SingularAttribute<CommentNotif, Integer> id;
    public static volatile SingularAttribute<CommentNotif, String> type;
    public static volatile SingularAttribute<CommentNotif, User> userId;

}