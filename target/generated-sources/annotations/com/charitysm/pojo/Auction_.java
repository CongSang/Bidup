package com.charitysm.pojo;

import com.charitysm.pojo.Bid;
import com.charitysm.pojo.PostNotif;
import com.charitysm.pojo.ReportAuction;
import com.charitysm.pojo.User;
import com.charitysm.pojo.base.PostBase_;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-09-21T16:38:58")
@StaticMetamodel(Auction.class)
public class Auction_ extends PostBase_ {

    public static volatile SetAttribute<Auction, Bid> bidSet;
    public static volatile SingularAttribute<Auction, Date> endDate;
    public static volatile SetAttribute<Auction, PostNotif> postNotifSet;
    public static volatile SetAttribute<Auction, ReportAuction> reportAuctionSet;
    public static volatile SingularAttribute<Auction, Short> mailTo;
    public static volatile SingularAttribute<Auction, Long> startingPrice;
    public static volatile SingularAttribute<Auction, User> userId;
    public static volatile SingularAttribute<Auction, Date> auctionDate;

}