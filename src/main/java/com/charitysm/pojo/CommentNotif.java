/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

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
@Table(name = "comment_notif")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CommentNotif.findAll", query = "SELECT c FROM CommentNotif c"),
    @NamedQuery(name = "CommentNotif.findById", query = "SELECT c FROM CommentNotif c WHERE c.id = :id"),
    @NamedQuery(name = "CommentNotif.findByType", query = "SELECT c FROM CommentNotif c WHERE c.type = :type"),
    @NamedQuery(name = "CommentNotif.findByIsRead", query = "SELECT c FROM CommentNotif c WHERE c.isRead = :isRead")})
public class CommentNotif implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "type")
    private String type;
    @Column(name = "is_read")
    private Boolean isRead;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
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
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.CommentNotif[ id=" + id + " ]";
    }

    /**
     * @return the isRead
     */
    public Boolean getIsRead() {
        return isRead;
    }

    /**
     * @param isRead the isRead to set
     */
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    
}
