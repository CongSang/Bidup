package com.charitysm.pojo;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.ReportBase_;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-27T20:59:11")
@StaticMetamodel(ReportAuction.class)
public class ReportAuction_ extends ReportBase_ {

    public static volatile SingularAttribute<ReportAuction, Auction> auctionId;
    public static volatile SingularAttribute<ReportAuction, User> userId;

}