package com.charitysm.pojo;

import com.charitysm.pojo.Comment;
import com.charitysm.pojo.ReactCommentPK;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.ReactBase_;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-11-12T11:35:33")
@StaticMetamodel(ReactComment.class)
public class ReactComment_ extends ReactBase_ {

    public static volatile SingularAttribute<ReactComment, ReactCommentPK> reactCommentPK;
    public static volatile SingularAttribute<ReactComment, Comment> comment;
    public static volatile SingularAttribute<ReactComment, User> user;

}