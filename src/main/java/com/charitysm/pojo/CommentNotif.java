/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.NotifBase;
import java.io.Serializable;
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
@Table(name = "comment_notif")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CommentNotif.findAll", query = "SELECT c FROM CommentNotif c"),
    @NamedQuery(name = "CommentNotif.findById", query = "SELECT c FROM CommentNotif c WHERE c.id = :id"),
    @NamedQuery(name = "CommentNotif.findByType", query = "SELECT c FROM CommentNotif c WHERE c.type = :type"),
    @NamedQuery(name = "CommentNotif.findByIsRead", query = "SELECT c FROM CommentNotif c WHERE c.isRead = :isRead")})
public class CommentNotif extends NotifBase implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Comment commentId;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    public CommentNotif() {
    }

    public CommentNotif(Integer id) {
        this.id = id;
    }

    public CommentNotif(Integer id, String type) {
        this.id = id;
        this.type = type;
    }

    public Comment getCommentId() {
        return commentId;
    }

    public void setCommentId(Comment commentId) {
        this.commentId = commentId;
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
        if (!(object instanceof CommentNotif)) {
            return false;
        }
        CommentNotif other = (CommentNotif) object;
        return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.CommentNotif[ id=" + id + " ]";
    }
    
}
