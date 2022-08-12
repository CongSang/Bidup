package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-12T15:39:33")
@StaticMetamodel(ReportPost.class)
public class ReportPost_ { 

    public static volatile SingularAttribute<ReportPost, String> reason;
    public static volatile SingularAttribute<ReportPost, Short> isSolve;
    public static volatile SingularAttribute<ReportPost, Date> reportedDate;
    public static volatile SingularAttribute<ReportPost, Integer> id;
    public static volatile SingularAttribute<ReportPost, Post> postId;
    public static volatile SingularAttribute<ReportPost, User> userId;

}