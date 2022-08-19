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

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-19T18:12:45")
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