/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.PostBase;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "auction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Auction.findAll", query = "SELECT a FROM Auction a"),
    @NamedQuery(name = "Auction.findById", query = "SELECT a FROM Auction a WHERE a.id = :id"),
    @NamedQuery(name = "Auction.findByContent", query = "SELECT a FROM Auction a WHERE a.content = :content"),
    @NamedQuery(name = "Auction.findByImage", query = "SELECT a FROM Auction a WHERE a.image = :image"),
    @NamedQuery(name = "Auction.findByStartingPrice", query = "SELECT a FROM Auction a WHERE a.startingPrice = :startingPrice"),
    @NamedQuery(name = "Auction.findByAuctionDate", query = "SELECT a FROM Auction a WHERE a.auctionDate = :auctionDate"),
    @NamedQuery(name = "Auction.findByEndDate", query = "SELECT a FROM Auction a WHERE a.endDate = :endDate"),
    @NamedQuery(name = "Auction.findByHashtag", query = "SELECT a FROM Auction a WHERE a.hashtag = :hashtag"),
    @NamedQuery(name = "Auction.findByActive", query = "SELECT a FROM Auction a WHERE a.active = :active"),
    @NamedQuery(name = "Auction.findByMailTo", query = "SELECT a FROM Auction a WHERE a.mailTo = :mailTo")})
public class Auction extends PostBase implements Serializable {

    @OneToMany(mappedBy = "auctionId")
    @JsonIgnore
    private Set<PostNotif> postNotifSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "auctionId")
    @JsonIgnore
    private Set<ReportAuction> reportAuctionSet;

    private static final long serialVersionUID = 1L;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "starting_price")
    private long startingPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "auction_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date auctionDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "end_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
    @Column(name = "mail_to")
    private Short mailTo;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "auction")
    private Set<Bid> bidSet;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    public Auction() {
    }

    public Auction(Integer id) {
        this.id = id;
    }

    public Auction(Integer id, long startingPrice, Date auctionDate, Date endDate) {
        this.id = id;
        this.startingPrice = startingPrice;
        this.auctionDate = auctionDate;
        this.endDate = endDate;
    }

    public long getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(long startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Date getAuctionDate() {
        return auctionDate;
    }

    public void setAuctionDate(Date auctionDate) {
        this.auctionDate = auctionDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Short getMailTo() {
        return mailTo;
    }

    public void setMailTo(Short mailTo) {
        this.mailTo = mailTo;
    }

    @XmlTransient
    public Set<Bid> getBidSet() {
        return bidSet;
    }

    public void setBidSet(Set<Bid> bidSet) {
        this.bidSet = bidSet;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Auction)) {
            return false;
        }
        Auction other = (Auction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.Auction[ id=" + id + " ]";
    }

    @XmlTransient
    public Set<ReportAuction> getReportAuctionSet() {
        return reportAuctionSet;
    }

    public void setReportAuctionSet(Set<ReportAuction> reportAuctionSet) {
        this.reportAuctionSet = reportAuctionSet;
    }

    @XmlTransient
    public Set<PostNotif> getPostNotifSet() {
        return postNotifSet;
    }

    public void setPostNotifSet(Set<PostNotif> postNotifSet) {
        this.postNotifSet = postNotifSet;
    }
    
}
