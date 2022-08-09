package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-09T22:39:56")
@StaticMetamodel(PostNotif.class)
public class PostNotif_ { 

    public static volatile SingularAttribute<PostNotif, Short> isRead;
    public static volatile SingularAttribute<PostNotif, Integer> id;
    public static volatile SingularAttribute<PostNotif, Post> postId;
    public static volatile SingularAttribute<PostNotif, String> type;
    public static volatile SingularAttribute<PostNotif, User> userId;

}