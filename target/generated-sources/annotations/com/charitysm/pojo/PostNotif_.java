package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-20T13:53:35")
=======
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-29T19:03:05")
>>>>>>> main
@StaticMetamodel(PostNotif.class)
public class PostNotif_ { 

    public static volatile SingularAttribute<PostNotif, Auction> auctionId;
    public static volatile SingularAttribute<PostNotif, Boolean> isRead;
    public static volatile SingularAttribute<PostNotif, Integer> id;
    public static volatile SingularAttribute<PostNotif, Post> postId;
    public static volatile SingularAttribute<PostNotif, String> type;
    public static volatile SingularAttribute<PostNotif, User> userId;

}