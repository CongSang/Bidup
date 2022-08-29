package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.CommentNotif;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.ReactComment;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

<<<<<<< HEAD
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-20T13:53:35")
=======
@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-29T19:03:05")
>>>>>>> main
@StaticMetamodel(Comment.class)
public class Comment_ { 

    public static volatile SetAttribute<Comment, Comment> commentSet;
    public static volatile SetAttribute<Comment, CommentNotif> commentNotifSet;
    public static volatile SingularAttribute<Comment, Date> commentDate;
    public static volatile SetAttribute<Comment, ReactComment> reactCommentSet;
    public static volatile SingularAttribute<Comment, Integer> id;
    public static volatile SingularAttribute<Comment, Post> postId;
    public static volatile SingularAttribute<Comment, User> userId;
    public static volatile SingularAttribute<Comment, Comment> parentId;
    public static volatile SingularAttribute<Comment, String> content;

}