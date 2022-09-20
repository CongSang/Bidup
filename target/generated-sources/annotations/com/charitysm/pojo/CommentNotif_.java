package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.NotifBase_;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-20T18:28:04")
@StaticMetamodel(CommentNotif.class)
public class CommentNotif_ extends NotifBase_ {

    public static volatile SingularAttribute<CommentNotif, Comment> commentId;
    public static volatile SingularAttribute<CommentNotif, User> userId;

}