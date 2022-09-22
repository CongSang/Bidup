package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.NotifBase_;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-22T10:39:50")
@StaticMetamodel(PostNotif.class)
public class PostNotif_ extends NotifBase_ {

    public static volatile SingularAttribute<PostNotif, Auction> auctionId;
    public static volatile SingularAttribute<PostNotif, Post> postId;
    public static volatile SingularAttribute<PostNotif, User> userId;

}