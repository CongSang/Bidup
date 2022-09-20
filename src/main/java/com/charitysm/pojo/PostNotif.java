/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.NotifBase;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "post_notif")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PostNotif.findAll", query = "SELECT p FROM PostNotif p"),
    @NamedQuery(name = "PostNotif.findById", query = "SELECT p FROM PostNotif p WHERE p.id = :id"),
    @NamedQuery(name = "PostNotif.findByType", query = "SELECT p FROM PostNotif p WHERE p.type = :type"),
    @NamedQuery(name = "PostNotif.findByIsRead", query = "SELECT p FROM PostNotif p WHERE p.isRead = :isRead")})
public class PostNotif extends NotifBase implements Serializable {

    @JoinColumn(name = "auction_id", referencedColumnName = "id")
    @ManyToOne
    private Auction auctionId;

    private static final long serialVersionUID = 1L;
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Post postId;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    public PostNotif() {
    }

    public PostNotif(Integer id) {
        this.id = id;
    }

    public PostNotif(Integer id, String type) {
        this.id = id;
        this.type = type;
    }

    public Post getPostId() {
        return postId;
    }

    public void setPostId(Post postId) {
        this.postId = postId;
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
        if (!(object instanceof PostNotif)) {
            return false;
        }
        PostNotif other = (PostNotif) object;
        return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.PostNotif[ id=" + id + " ]";
    }

    public Auction getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Auction auctionId) {
        this.auctionId = auctionId;
    }
    
}
