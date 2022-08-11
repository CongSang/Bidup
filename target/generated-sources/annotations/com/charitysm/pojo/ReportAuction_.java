package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-08-10T20:37:29")
@StaticMetamodel(ReportAuction.class)
public class ReportAuction_ { 

    public static volatile SingularAttribute<ReportAuction, Auction> auctionId;
    public static volatile SingularAttribute<ReportAuction, String> reason;
    public static volatile SingularAttribute<ReportAuction, Short> isSolve;
    public static volatile SingularAttribute<ReportAuction, Date> reportedDate;
    public static volatile SingularAttribute<ReportAuction, Integer> id;
    public static volatile SingularAttribute<ReportAuction, User> userId;

}