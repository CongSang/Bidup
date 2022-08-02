package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Bid;
import com.charitysm.pojo.Comment;
import com.charitysm.pojo.Notification;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.React;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-02T19:21:36")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SetAttribute<User, Auction> auctionSet;
    public static volatile SingularAttribute<User, String> firstname;
    public static volatile SingularAttribute<User, String> hometown;
    public static volatile SingularAttribute<User, Date> birthdate;
    public static volatile SingularAttribute<User, String> address;
    public static volatile SingularAttribute<User, Short> active;
    public static volatile SetAttribute<User, React> reactSet;
    public static volatile SingularAttribute<User, String> avatar;
    public static volatile SetAttribute<User, Post> postSet;
    public static volatile SingularAttribute<User, String> lastname;
    public static volatile SingularAttribute<User, String> password;
    public static volatile SingularAttribute<User, Date> createdDate;
    public static volatile SetAttribute<User, Notification> notificationSet;
    public static volatile SetAttribute<User, Comment> commentSet;
    public static volatile SetAttribute<User, Bid> bidSet;
    public static volatile SingularAttribute<User, String> phone;
    public static volatile SingularAttribute<User, String> id;
    public static volatile SingularAttribute<User, String> userRole;
    public static volatile SingularAttribute<User, String> job;
    public static volatile SingularAttribute<User, String> email;

}