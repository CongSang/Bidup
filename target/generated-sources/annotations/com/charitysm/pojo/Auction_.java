package com.charitysm.pojo;

import com.charitysm.pojo.Bid;
import com.charitysm.pojo.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.9.v20210604-rNA", date="2022-07-29T15:38:57")
@StaticMetamodel(Auction.class)
public class Auction_ { 

    public static volatile SingularAttribute<Auction, String> image;
    public static volatile SetAttribute<Auction, Bid> bidSet;
    public static volatile SingularAttribute<Auction, Date> endDate;
    public static volatile SingularAttribute<Auction, Short> active;
    public static volatile SingularAttribute<Auction, Integer> id;
    public static volatile SingularAttribute<Auction, Long> startingPrice;
    public static volatile SingularAttribute<Auction, User> userId;
    public static volatile SingularAttribute<Auction, String> content;

}