package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.ReactCommentPK;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-15T17:01:07")
@StaticMetamodel(ReactComment.class)
public class ReactComment_ { 

    public static volatile SingularAttribute<ReactComment, Date> createdDate;
    public static volatile SingularAttribute<ReactComment, ReactCommentPK> reactCommentPK;
    public static volatile SingularAttribute<ReactComment, Comment> comment;
    public static volatile SingularAttribute<ReactComment, Short> type;
    public static volatile SingularAttribute<ReactComment, User> user;

}