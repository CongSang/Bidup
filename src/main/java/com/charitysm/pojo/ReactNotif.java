/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "react_notif")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReactNotif.findAll", query = "SELECT r FROM ReactNotif r"),
    @NamedQuery(name = "ReactNotif.findByPostId", query = "SELECT r FROM ReactNotif r WHERE r.reactNotifPK.postId = :postId"),
    @NamedQuery(name = "ReactNotif.findByUserId", query = "SELECT r FROM ReactNotif r WHERE r.reactNotifPK.userId = :userId"),
    @NamedQuery(name = "ReactNotif.findByCreatedDate", query = "SELECT r FROM ReactNotif r WHERE r.createdDate = :createdDate"),
    @NamedQuery(name = "ReactNotif.findByIsRead", query = "SELECT r FROM ReactNotif r WHERE r.isRead = :isRead")})
public class ReactNotif implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected ReactNotifPK reactNotifPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Column(name = "is_read")
    private Short isRead;
    @JoinColumn(name = "post_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonIgnore
    private Post post;
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonIgnore
    private User user;

    public ReactNotif() {
    }

    public ReactNotif(ReactNotifPK reactNotifPK) {
        this.reactNotifPK = reactNotifPK;
    }

    public ReactNotif(ReactNotifPK reactNotifPK, Date createdDate) {
        this.reactNotifPK = reactNotifPK;
        this.createdDate = createdDate;
    }

    public ReactNotif(int postId, String userId) {
        this.reactNotifPK = new ReactNotifPK(postId, userId);
    }

    public ReactNotifPK getReactNotifPK() {
        return reactNotifPK;
    }

    public void setReactNotifPK(ReactNotifPK reactNotifPK) {
        this.reactNotifPK = reactNotifPK;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Short getIsRead() {
        return isRead;
    }

    public void setIsRead(Short isRead) {
        this.isRead = isRead;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
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
        hash += (reactNotifPK != null ? reactNotifPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReactNotif)) {
            return false;
        }
        ReactNotif other = (ReactNotif) object;
        if ((this.reactNotifPK == null && other.reactNotifPK != null) || (this.reactNotifPK != null && !this.reactNotifPK.equals(other.reactNotifPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReactNotif[ reactNotifPK=" + reactNotifPK + " ]";
    }
    
}
