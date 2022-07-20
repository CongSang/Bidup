/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "bid")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bid.findAll", query = "SELECT b FROM Bid b"),
    @NamedQuery(name = "Bid.findByUserId", query = "SELECT b FROM Bid b WHERE b.bidPK.userId = :userId"),
    @NamedQuery(name = "Bid.findByAuctionId", query = "SELECT b FROM Bid b WHERE b.bidPK.auctionId = :auctionId"),
    @NamedQuery(name = "Bid.findByMoney", query = "SELECT b FROM Bid b WHERE b.money = :money"),
    @NamedQuery(name = "Bid.findByMessage", query = "SELECT b FROM Bid b WHERE b.message = :message")})
public class Bid implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected BidPK bidPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "money")
    private long money;
    @Size(max = 200)
    @Column(name = "message")
    private String message;
    @JoinColumn(name = "auction_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Auction auction;
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private User user;

    public Bid() {
    }

    public Bid(BidPK bidPK) {
        this.bidPK = bidPK;
    }

    public Bid(BidPK bidPK, long money) {
        this.bidPK = bidPK;
        this.money = money;
    }

    public Bid(String userId, int auctionId) {
        this.bidPK = new BidPK(userId, auctionId);
    }

    public BidPK getBidPK() {
        return bidPK;
    }

    public void setBidPK(BidPK bidPK) {
        this.bidPK = bidPK;
    }

    public long getMoney() {
        return money;
    }

    public void setMoney(long money) {
        this.money = money;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bidPK != null ? bidPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bid)) {
            return false;
        }
        Bid other = (Bid) object;
        if ((this.bidPK == null && other.bidPK != null) || (this.bidPK != null && !this.bidPK.equals(other.bidPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.Bid[ bidPK=" + bidPK + " ]";
    }
    
}
