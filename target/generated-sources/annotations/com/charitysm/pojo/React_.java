package com.charitysm.pojo;

import com.charitysm.pojo.Post;
import com.charitysm.pojo.ReactPK;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-07T18:32:40")
@StaticMetamodel(React.class)
public class React_ { 

    public static volatile SingularAttribute<React, Date> createdDate;
    public static volatile SingularAttribute<React, Post> post;
    public static volatile SingularAttribute<React, Short> type;
    public static volatile SingularAttribute<React, User> user;
    public static volatile SingularAttribute<React, ReactPK> reactPK;

}