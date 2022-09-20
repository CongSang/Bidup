package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.ReportBase_;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-20T18:28:04")
@StaticMetamodel(ReportPost.class)
public class ReportPost_ extends ReportBase_ {

    public static volatile SingularAttribute<ReportPost, Post> postId;
    public static volatile SingularAttribute<ReportPost, User> userId;

}