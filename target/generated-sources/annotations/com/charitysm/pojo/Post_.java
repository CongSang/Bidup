package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.PostNotif;
import com.charitysm.pojo.React;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.PostBase_;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-27T20:59:11")
@StaticMetamodel(Post.class)
public class Post_ extends PostBase_ {

    public static volatile SetAttribute<Post, ReportPost> reportPostSet;
    public static volatile SetAttribute<Post, Comment> commentSet;
    public static volatile SetAttribute<Post, PostNotif> postNotifSet;
    public static volatile SetAttribute<Post, React> reactSet;
    public static volatile SingularAttribute<Post, User> userId;
    public static volatile SingularAttribute<Post, Date> postedDate;

}