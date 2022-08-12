package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Bid;
import com.charitysm.pojo.Comment;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.PostNotif;
import com.charitysm.pojo.React;
import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.ReportPost;
import com.charitysm.pojo.ReportUser;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-12T01:40:35")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> firstname;
    public static volatile SingularAttribute<User, Date> birthdate;
    public static volatile SetAttribute<User, ReportUser> reportUserSet;
    public static volatile SetAttribute<User, Post> postSet;
    public static volatile SingularAttribute<User, String> password;
    public static volatile SetAttribute<User, Comment> commentSet;
    public static volatile SetAttribute<User, Bid> bidSet;
    public static volatile SetAttribute<User, ReportAuction> reportAuctionSet;
    public static volatile SingularAttribute<User, String> id;
    public static volatile SingularAttribute<User, String> email;
    public static volatile SetAttribute<User, Auction> auctionSet;
    public static volatile SingularAttribute<User, String> hometown;
    public static volatile SingularAttribute<User, String> address;
    public static volatile SetAttribute<User, User> userSet1;
    public static volatile SetAttribute<User, PostNotif> postNotifSet;
    public static volatile SingularAttribute<User, Short> active;
    public static volatile SetAttribute<User, React> reactSet;
    public static volatile SingularAttribute<User, String> avatar;
    public static volatile SetAttribute<User, User> userSet;
    public static volatile SingularAttribute<User, String> lastname;
    public static volatile SetAttribute<User, ReportPost> reportPostSet;
    public static volatile SingularAttribute<User, Date> createdDate;
    public static volatile SingularAttribute<User, String> phone;
    public static volatile SingularAttribute<User, String> job;
    public static volatile SingularAttribute<User, String> userRole;

}