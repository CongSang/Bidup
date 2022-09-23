/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.communicateObj;

import java.io.Serializable;

/**
 *
 * @author CÔNG SANG
 */
public class BidRequest implements Serializable {
    private long money;
    private int auctionId;
    private String userId;

    public BidRequest() {
    }

    /**
     * @return the money
     */
    public long getMoney() {
        return money;
    }

    /**
     * @param money the money to set
     */
    public void setMoney(long money) {
        this.money = money;
    }

    /**
     * @return the auctionId
     */
    public int getAuctionId() {
        return auctionId;
    }

    /**
     * @param auctionId the auctionId to set
     */
    public void setAuctionId(int auctionId) {
        this.auctionId = auctionId;
    }

    /**
     * @return the userId
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
}
