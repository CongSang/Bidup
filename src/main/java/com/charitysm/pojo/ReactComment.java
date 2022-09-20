/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.ReactBase;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "react_comment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReactComment.findAll", query = "SELECT r FROM ReactComment r"),
    @NamedQuery(name = "ReactComment.findByUserId", query = "SELECT r FROM ReactComment r WHERE r.reactCommentPK.userId = :userId"),
    @NamedQuery(name = "ReactComment.findByCommentId", query = "SELECT r FROM ReactComment r WHERE r.reactCommentPK.commentId = :commentId"),
    @NamedQuery(name = "ReactComment.findByType", query = "SELECT r FROM ReactComment r WHERE r.type = :type"),
    @NamedQuery(name = "ReactComment.findByCreatedDate", query = "SELECT r FROM ReactComment r WHERE r.createdDate = :createdDate")})
public class ReactComment extends ReactBase implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected ReactCommentPK reactCommentPK;
    @JoinColumn(name = "comment_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonIgnore
    private Comment comment;
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private User user;

    public ReactComment() {
    }

    public ReactComment(ReactCommentPK reactCommentPK) {
        this.reactCommentPK = reactCommentPK;
    }

    public ReactComment(ReactCommentPK reactCommentPK, Date createdDate) {
        this.reactCommentPK = reactCommentPK;
        this.createdDate = createdDate;
    }

    public ReactComment(String userId, int commentId) {
        this.reactCommentPK = new ReactCommentPK(userId, commentId);
    }

    public ReactCommentPK getReactCommentPK() {
        return reactCommentPK;
    }

    public void setReactCommentPK(ReactCommentPK reactCommentPK) {
        this.reactCommentPK = reactCommentPK;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (reactCommentPK != null ? reactCommentPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReactComment)) {
            return false;
        }
        ReactComment other = (ReactComment) object;
        return !((this.reactCommentPK == null && other.reactCommentPK != null) || (this.reactCommentPK != null && !this.reactCommentPK.equals(other.reactCommentPK)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReactComment[ reactCommentPK=" + reactCommentPK + " ]";
    }

    /**
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(User user) {
        this.user = user;
    }
    
}
